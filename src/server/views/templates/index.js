export default function render(data) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <div id="react-mount">${data.html}</div>
        <script>

        </script>
        <script src="${data.bundleUrl}"></script>
      </body>
    </html>
  `;
}
