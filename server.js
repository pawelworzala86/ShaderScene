import express from 'express'
import path from 'path'

const app = express();
const PORT = process.env.PORT || 3000;

// Serwowanie statycznych plików z folderu "public"
app.use(express.static(path.resolve('./public')));
app.use('/sources',express.static(path.resolve('./sources')));
app.use('/shaders',express.static(path.resolve('./shaders')));

// Fallback dla SPA lub stron bez routera
app.get(/\*/, (req, res) => {
  res.sendFile(path.resolve('./public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server działa na http://localhost:${PORT}`);
});