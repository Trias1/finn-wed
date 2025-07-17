// pages/test-cache.tsx
import Test from "./test";

export default function TestCache() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Test Cache Page</h1>
      <p>Build at: {new Date().toLocaleString()}</p>
      <Test />
    </div>
  );
}