from flask import Flask, render_template, redirect, url_for, request, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from models import db, User, Subscriber, Feedback

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key_here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# ---------------- Home Route ----------------
@app.route('/')
def home():
    subscribers = Subscriber.query.all()
    feedbacks = Feedback.query.all()
    return render_template('index.html', user=current_user, subscribers=subscribers, feedbacks=feedbacks)

# ---------------- Register Route ----------------
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        if User.query.filter_by(email=email).first():
            flash('Email already registered!', 'danger')
            return redirect(url_for('register'))
        new_user = User(email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        flash('Registration successful!', 'success')
        return redirect(url_for('login'))
    return render_template('register.html')

# ---------------- Login Route ----------------
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            login_user(user)
            flash('Login successful!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Invalid credentials', 'danger')
    return render_template('login.html')


# ---------------- Forgot Password Route ----------------
@app.route('/forgot_password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.form.get('email')
        user = User.query.filter_by(email=email).first()
        if user:
            # In a real app: generate token and send email. Here we mock the behavior.
            flash('If that email is registered, a reset link has been sent.', 'info')
        else:
            flash('If that email is registered, a reset link has been sent.', 'info')
        return redirect(url_for('login'))
    return render_template('forgot_password.html')


# ---------------- Set Theme Route ----------------
@app.route('/set_theme', methods=['POST'])
@login_required
def set_theme():
    try:
        data = request.get_json(force=True)
        theme = data.get('theme')
        if theme not in ('light', 'dark'):
            return {'status': 'error', 'message': 'invalid theme'}, 400
        current_user.theme = theme
        db.session.commit()
        return {'status': 'ok'}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}, 500


# ---------------- Search Route ----------------
@app.route('/search')
def search():
    q = request.args.get('q', "").strip()
    results = []
    if q:
        import json, os
        data_path = os.path.join(app.root_path, 'static', 'data', 'products.json')
        try:
            with open(data_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                products = data.get('products', [])
                qlow = q.lower()
                for p in products:
                    title = str(p.get('title','')).lower()
                    cat = str(p.get('category','')).lower()
                    if qlow in title or qlow in cat:
                        results.append(p)
        except Exception as e:
            flash('Search currently unavailable', 'danger')
    return render_template('search_results.html', products=results, q=q)


@app.route('/api/products')
def api_products():
    import json, os
    data_path = os.path.join(app.root_path, 'static', 'data', 'products.json')
    try:
        with open(data_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return {'products': data.get('products', [])}
    except Exception:
        return {'products': []}


# ---------------- Cart Route ----------------
@app.route('/cart')
def cart():
    # Render cart view. If you want to require login add @login_required
    try:
        return render_template('cart.html')
    except Exception:
        # Fallback: if template missing, redirect to home
        return redirect(url_for('home'))

# ---------------- Logout Route ----------------
@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logged out successfully!', 'success')
    return redirect(url_for('home'))

# ---------------- Subscribe Route ----------------
@app.route('/subscribe', methods=['POST'])
def subscribe():
    email = request.form['email']
    if Subscriber.query.filter_by(email=email).first():
        flash('Already subscribed!', 'info')
    else:
        new_sub = Subscriber(email=email)
        db.session.add(new_sub)
        db.session.commit()
        flash('Subscribed successfully!', 'success')
    return redirect(url_for('home'))

# ---------------- Feedback Route ----------------
@app.route('/feedback', methods=['POST'])
def feedback():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']
    new_feedback = Feedback(name=name, email=email, message=message)
    db.session.add(new_feedback)
    db.session.commit()
    flash('Feedback submitted successfully!', 'success')
    return redirect(url_for('home'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
