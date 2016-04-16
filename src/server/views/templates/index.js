export default function render(data) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          ${data.css}
        </style>
      </head>
      <body>
        <div id="react-mount">${data.html}</div>
        <script>
          window.__RELAY_DATA__ = ${JSON.stringify(data.relay)};
        </script>
        <script src="${data.bundleUrl}"></script>
      </body>
    </html>
  `;
}
