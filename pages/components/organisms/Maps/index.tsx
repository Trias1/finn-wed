import React from "react";

export default function Maps() {
  return (
    <section id="maps">
      <div className="containers mt-4">
        <div className="card-maps">
          <div className="map-responsive">
            <iframe
              width="550"
              height="550"
              id="gmap_canvas"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.1032729427875!2d108.50396719999999!3d-6.757259599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f1f674ff78ebf%3A0x141da11be53d9ea8!2sGraha%20Umbaran!5e0!3m2!1sid!2sid!4v1744653678553!5m2!1sid!2sid"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              title="gmap"
            />
          </div>
          <a
            href="https://www.google.co.id/maps/place/Graha+Umbaran/@-6.7572596,108.5013923,17z/data=!3m1!4b1!4m6!3m5!1s0x2e6f1f674ff78ebf:0x141da11be53d9ea8!8m2!3d-6.7572596!4d108.5039672!16s%2Fg%2F11fp3vjt0l!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D"
            className="btn-maps"
          >
            Buka Maps
          </a>
        </div>
      </div>
    </section>
  );
}
