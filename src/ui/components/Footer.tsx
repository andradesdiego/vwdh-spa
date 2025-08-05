export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-xs">
          Diego Andrades | Senior Frontend Engineer Challenge for Volkswagen
          Digital:Hub | {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
