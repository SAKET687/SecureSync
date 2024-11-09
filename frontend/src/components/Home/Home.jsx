/* eslint-disable react/no-unescaped-entities */
import './Home.css';

const Home = () => {
    return (
        <div className='home-container'>
            <div className="home-header">
                <h2>Welcome to SecureSync</h2>
                <p className='home-subheading'>Your trusted solution for secure synchronization.</p>
            </div>
            <div className="home-content">
                <section className="home-section">
                    <h3>Why Choose Us?</h3>
                    <p>At SecureSync, we ensure that your data remains secure, synchronized, and easily accessible across all platforms. Join us to experience the future of secure syncing.</p>
                </section>
                <section className="home-section">
                    <h3>Features</h3>
                    <ul>
                        <li>Real-time Synchronization</li>
                        <li>Advanced Security Features</li>
                        <li>Cross-Platform Access</li>
                        <li>24/7 Customer Support</li>
                    </ul>
                </section>
                <section className="home-section">
                    <h3>Get Started</h3>
                    <p>Sign up today to start experiencing SecureSync’s powerful syncing capabilities. Don't miss out!</p>
                </section>
            </div>
        </div>
    );
};

export default Home;
