import Image from "next/image";

export default function LargeHero() {
  return (
    <section className="relative h-[850px] bg-gradient-to-br from-primary-5 to-secondary-5 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-10 rounded-full opacity-50"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary-10 rounded-full opacity-40"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-primary-25 rounded-full opacity-30"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 bg-secondary-25 rounded-full opacity-50"></div>
      </div>

      <div className="relative z-10 h-full flex">
        {/* Left content - iPad image taking full 50% */}
        <div className="w-1/2 flex items-center justify-center px-8 relative z-20">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/assets/images/brand/ipad.png"
              alt="Academy Learning Platform on iPad"
              width={800}
              height={600}
              className="w-full h-auto max-h-[700px] object-contain"
              style={{
                transform: "rotate(-8deg) scale(1.3)",
                transformOrigin: "center center",
              }}
              priority
            />
          </div>
        </div>

        {/* Right content - Text 50% */}
        <div className="w-1/2 flex items-center justify-center px-8 relative z-10">
          <div className="text-left space-y-8">
            <div className="space-y-6">
              <h1
                className="text-black capitalize"
                style={{
                  fontFamily: "Roboto",
                  fontWeight: 900,
                  fontStyle: "normal",
                  fontSize: "40px",
                  lineHeight: "68px",
                  letterSpacing: "0px",
                  textAlign: "left",
                }}
              >
                🙌 Hello friends we are tabaani academy and we want to start a
                HOSTING course together. Do you like it too 😍 ?
              </h1>
            </div>

            <button
              className="bg-dark hover:bg-dark-75 text-white transition-colors duration-200"
              style={{
                width: "183px",
                height: "60px",
                borderRadius: "10px",
                opacity: 1,
                gap: "8px",
                paddingTop: "20px",
                paddingRight: "20px",
                paddingBottom: "20px",
                paddingLeft: "24px",
              }}
            >
              Start New Course
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
