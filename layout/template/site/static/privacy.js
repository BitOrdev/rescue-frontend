async function getPrivacy(data){

    let privacyHtml = `
    <style>
        .privacy_title {
            text-align: center;
            padding: 20px;
            font-size: 1.8rem;
            font-weight: bold;
            letter-spacing: 1px;
            color: var(--white);
            border-radius: 1rem;
        }

        privacy_content {
            max-width: 900px;
            margin: 40px auto;
            padding: 20px;
            border-radius: 15px;
            color: var(--white);
        }

        h2 {
            color: var(--success);
            margin-top: 25px;
        }

        p {
            color: #ccc;
            margin-bottom: 15px;
        }

        a {
            color: var(--twitter_bg);
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        footer {
            text-align: center;
            color: #777;
            padding: 20px;
            font-size: 0.9rem;
        }
        </style>
        <div class="privacy_title moveGradientAniClass">🔒 Privacy Policy 🔒</div>
        <div class="privacy_content">
            <h2>1. Information We Collect</h2>
            <p>We do not store any personal information such as names, addresses, or identification data. Only wallet addresses and rescue-related details are temporarily processed for recovery purposes.</p>

            <h2>2. Private Key Handling</h2>
            <p>Your private key is used exclusively for the purpose of rescuing your assets. It is never shared, stored, or reused after the rescue operation is complete.</p>

            <h2>3. Security Commitment</h2>
            <p>All rescues are handled manually and securely. However, since compromised wallets are at risk, we cannot guarantee 100% security during the process.</p>

            <h2>4. Third-Party Links</h2>
            <p>Our communication happens only through verified platforms:</p>
            <p>
                <strong>X (Twitter):</strong> <a href="https://x.com/ncrypcode">@ncrypcode</a><br>
                <strong>Telegram:</strong> <a href="https://t.me/evm_recover">@evm_recover</a>
            </p>
            <p>Be cautious — we will never DM you first. Always verify contact before proceeding.</p>

            <h2>5. Data Retention</h2>
            <p>No sensitive data or transaction logs are stored beyond the duration of the recovery process. Once completed, all related data is deleted immediately.</p>

            <h2>6. Your Consent</h2>
            <p>By using this service, you agree to the collection and use of your wallet data as described in this policy solely for recovery purposes.</p>

            <h2>7. Changes to This Policy</h2>
            <p>This Privacy Policy may be updated periodically. Updates will be reflected on this page with the latest revision date.</p>
        </div>
        <footer>© 2025 Rescue Service | Privacy Protected.</footer>
        `;

return privacyHtml;

}
export { getPrivacy };