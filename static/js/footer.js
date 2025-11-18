// Get modal elements
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeBtn = document.querySelector(".close");

// Show modal content when any footer link is clicked
document.querySelectorAll(".infoLink").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const content = e.target.dataset.content;

    switch(content) {

      // About Us
      case "about":
        modalBody.innerHTML = `
          <h2>About ABCPhone Shop</h2>

          <p><strong>Connecting you to the future, affordably.</strong></p>

          <p>Welcome to <strong>ABCPhone Shop</strong>, your trusted local source for the latest mobile devices, reliable accessories, and comprehensive repair services. Founded in 2018, we focus on providing straightforward advice and genuine value to every customer.</p>

          <h3>Our Mission</h3>
          <p>To ensure everyone has access to the best mobile technology that fits their needs and budget, supported by knowledgeable, friendly, and honest service.</p>

          <h3>Our Core Values</h3>
          <ul>
            <li><strong>Customer First:</strong> Your satisfaction drives everything we do, from recommending a device to performing a quick repair.</li>
            <li><strong>Expertise:</strong> Our team is highly trained on every major operating system and device model.</li>
            <li><strong>Quality & Trust:</strong> We only stock authentic products and use certified parts for all repairs.</li>
          </ul>

          <p>Visit us today to experience the difference. We look forward to helping you stay connected!</p>
        `;
        break;

      // Privacy Policy
      case "privacy":
        modalBody.innerHTML = `
          <h2>Privacy Policy</h2>

          <p><strong>Last Updated:</strong> October 6, 2025</p>

          <p>This Privacy Policy describes how <strong>ABCPhone Shop</strong> collects, uses, and discloses your personal information.</p>

          <h3>Information We Collect</h3>
          <ul>
            <li><strong>Identity Data:</strong> Name, address, phone number, email.</li>
            <li><strong>Financial Data:</strong> Payment details (processed securely by third-party providers).</li>
            <li><strong>Transaction Data:</strong> Orders and services purchased.</li>
          </ul>

          <h3>How We Use Your Information</h3>
          <ul>
            <li>To fulfill orders and manage repair appointments.</li>
            <li>To communicate with you regarding your account, orders, or service updates.</li>
            <li>To improve our product selection and in-store experience.</li>
            <li>For compliance with legal obligations and to prevent fraud.</li>
          </ul>

          <h3>Contact Us</h3>
          <p>Email: <strong>privacy@abcphoneshop.com</strong></p>
        `;
        break;

      // Terms & Conditions
      case "terms":
        modalBody.innerHTML = `
          <h2>Terms & Conditions</h2>

          <p>These Terms and Conditions ("Terms") govern your use of the <strong>ABCPhone Shop</strong> website and in-store services.</p>

          <h3>1. Purchase Agreement</h3>
          <p>By placing an order or initiating a service, you agree to these Terms. All product sales are subject to availability. Prices may change without notice, but confirmed orders remain unaffected.</p>

          <h3>2. Device Repair Service</h3>
          <ul>
            <li><strong>Diagnosis Fee:</strong> Non-refundable; credited toward total cost if repair completed.</li>
            <li><strong>Risk of Data Loss:</strong> Backup recommended before any repair. ABCPhone Shop is not liable for data loss.</li>
          </ul>

          <h3>3. Returns and Warranty</h3>
          <ul>
            <li>New devices: 14-day return window with original receipt and packaging.</li>
            <li>Repaired devices: 90-day warranty on parts and labor related to the original repair.</li>
          </ul>

          <h3>4. Limitation of Liability</h3>
          <p>ABCPhone Shop is not liable for indirect, incidental, or consequential damages. Total liability is limited to the amount paid for the product or service.</p>
        `;
        break;

      // Contact Us
      case "contact":
        modalBody.innerHTML = `
          <h2>Contact Us</h2>

          <p>We are here to assist you with sales, support, and repairs.</p>

          <h3>Customer Support & Sales</h3>
          <ul>
            <li><strong>Phone:</strong> (800) 555-0199</li>
            <li><strong>Email:</strong> support@abcphoneshop.com</li>
            <li><strong>Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM (EST)</li>
          </ul>

          <h3>Store Location & Repair Drop-off</h3>
          <ul>
            <li><strong>Address:</strong> 456 Tech Avenue, Unit B, Mobile City, State 12345</li>
            <li><strong>View Map:</strong> Click the address link in the footer</li>
          </ul>

          <h3>Corporate & Legal Inquiries</h3>
          <p>Email: info@abcphoneshop.com</p>

          <h3>Send Us a Message</h3>
          <p>Use the contact form, and we will respond within 24 business hours.</p>
        `;
        break;

      // Brands
      case "brands":
        modalBody.innerHTML = `
          <h2>Brands</h2>
          <p>Explore a wide variety of top mobile phone brands available at ABCPhone Shop. We stock the latest models from trusted manufacturers, ensuring quality and authenticity for every purchase.</p>
        `;
        break;

      // Gift Certificates
      case "gift":
        modalBody.innerHTML = `
          <h2>Gift Certificates</h2>
          <p>Looking for the perfect gift? Purchase our ABCPhone Shop gift certificates. They can be used to buy any product or service in-store or online, making gifting easy and convenient.</p>
        `;
        break;

      // Affiliate Program
      case "affiliate":
        modalBody.innerHTML = `
          <h2>Affiliate Program</h2>
          <p>Join our affiliate program and earn commissions by referring customers to ABCPhone Shop. It’s a simple way to share your love for technology and get rewarded for it.</p>
        `;
        break;

      // Specials
      case "specials":
        modalBody.innerHTML = `
          <h2>Specials</h2>
          <p>Check out our latest deals and promotions. From discounted phones to bundle offers, our specials page helps you save money while staying connected with the latest tech.</p>
        `;
        break;

      // My Account
      case "account":
        modalBody.innerHTML = `
          <h2>My Account</h2>
          <p>Manage your account with ABCPhone Shop. Update your personal details, view your order history, track current orders, and manage your wishlist—all in one place.</p>
        `;
        break;

      // Order History
      case "order":
        modalBody.innerHTML = `
          <h2>Order History</h2>
          <p>View all your past orders, including purchase dates, product details, and order status. Stay organized and keep track of everything you’ve bought from ABCPhone Shop.</p>
        `;
        break;

      // Wishlist
      case "wishlist":
        modalBody.innerHTML = `
          <h2>Wish List</h2>
          <p>Create and manage your wishlist to keep track of products you’re interested in. Easily move items to your cart when you’re ready to purchase.</p>
        `;
        break;

      // Newsletter
      case "newsletter":
        modalBody.innerHTML = `
          <h2>Newsletter</h2>
          <p>Subscribe to the ABCPhone Shop newsletter to receive updates on new products, exclusive offers, and tech tips delivered straight to your inbox.</p>
        `;
        break;

      // Default
      default:
        modalBody.innerHTML = "<p>Content not available.</p>";
    }

    modal.classList.remove("hidden");
  });
});

// Map button functionality
document.getElementById("mapBtn").addEventListener("click", e => {
  e.preventDefault();
  modalBody.innerHTML = `
    <h2>Our Location</h2>
    <iframe 
      src="https://www.google.com/maps?q=42+Dream+House,+Dreammy+Street,+Dreamville,+USA&output=embed" 
      width="100%" height="300" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0">
    </iframe>
  `;
  modal.classList.remove("hidden");
});

// Close modal
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", e => { 
  if(e.target === modal) modal.classList.add("hidden"); 
});
