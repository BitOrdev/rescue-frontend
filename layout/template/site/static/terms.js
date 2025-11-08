async function getTerms() {
    let termsHtml = `
    <style>

        .terms_content {
          color: var(--white);
        }

        .terms_title{
          font-weight: bold;
          color: var(--white);
          text-align: center;
          padding: 20px;
          font-size: 1.5rem;
          font-weight: bold;
          letter-spacing: 1px;
          border-radius: 1rem;
        }

        h2 {
            color: var(--success);
            margin-top: 25px;
        }

        ul {
            list-style: none;
            padding-left: 0;
        }

        ul li {
            margin-bottom: 10px;
            color: #ccc;
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
        <div class="terms_title moveGradientAniClass">✨ Terms & Conditions ✨</div>
        <div class="terms_content">
            <h2>1. Minimum Rescue Value</h2>
            <p>Only tokens or NFTs with a total estimated value of at least <strong>$1</strong> are eligible for rescue (airdrop, staked, transfer, or contract-based).</p>

            <h2>2. Rescue Charges</h2>
            <ul>
                <li>$1 – $99 : <strong>20%</strong> fee</li>
                <li>$100 – $199 : <strong>17.5%</strong> fee</li>
                <li>$200 – $299 : <strong>15%</strong> fee</li>
                <li>$300 – $399 : <strong>12.5%</strong> fee</li>
                <li>Above $399 : <strong>10%</strong> fee</li>
            </ul>

            <h2>3. Private Key Requirement</h2>
            <p>You must share your compromised wallet’s private key for token or NFT rescue. This is essential to access and recover staked or airdropped assets.</p>

            <h2>4. Contact Information</h2>
            <p>
                <strong>X (Twitter):</strong> <a href="https://x.com/ncrypcode">@ncrypcode</a><br>
                <strong>Telegram:</strong> <a href="https://t.me/evm_recover">@evm_recover</a>
            </p>
            <p><em>I will never DM you first. If someone pretends to be me, they are a scammer — block immediately.</em></p>

            <h2>5. Risk Acknowledgement</h2>
            <p>There is always a risk that a hacker or automated sweeper bot could act before recovery is complete. By sharing your key, you accept this risk and agree that the service provider is not liable for any loss.</p>

            <h2>6. Supported Networks</h2>
            <p>Ethereum, BNB, Base, Optimism, Arbitrum, Polygon, Gnosis, Avalanche, Unichain, Scroll, Hyperliquid, Ink, Zora, Soneium, Mode, Berachain, Celo.</p>

            <h2>7. Agreement</h2>
            <p>By proceeding with the recovery service, you confirm that you have read, understood, and agreed to all terms above.</p>
        </div>
        <footer>© 2025 Rescue Service | All Rights Reserved.</footer>
    `;

    return termsHtml;
}

export { getTerms };