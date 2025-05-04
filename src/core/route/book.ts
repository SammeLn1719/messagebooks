// app/api/books/route.ts
export async function GET() {
  const res = await fetch('http://localhost:8080/books');
  const data = await res.json();
  return Response.json(data);
}
