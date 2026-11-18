export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-4">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-6">
            <p className="fw-bold fs-5 mb-2">SpecMate</p>
            <p className="mb-0">
              A simple laptop recommendation platform that helps college students find a laptop that fits their
              program, budget, and lifestyle.
            </p>
          </div>
          <div className="col-lg-6">
            <h2 className="h6 text-light">Please note</h2>
            <p className="small mb-0">
              Laptop specs and prices shown are sample data. Confirm details with the seller before buying.
            </p>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="small mb-0">© {new Date().getFullYear()} SpecMate. A student project.</p>
      </div>
    </footer>
  );
}
