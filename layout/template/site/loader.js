async function getLoader(){
    let loader = `
    <style>

        .loader_parent{
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: var(--body_black);
        }

        .loader {
            width: 48px;
            height: 48px;
            border-top: 4px solid var(--loader_color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            box-shadow: 0 0 20px var(--loader_shadow);
        }

        @keyframes spin {
            to {
              transform: rotate(360deg);
            }
        }
        </style>

        <div class="loader_parent">
          <div class="loader"></div>
        </div>
    `;

    return loader;
}




export { getLoader };