import app from "./index";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});

export default app;
