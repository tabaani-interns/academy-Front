import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#f5f3ff] text-[#171717] px-4 sm:px-6 lg:px-20 py-12">
      
      {/* Intro Paragraph + Logo */}
      <div className="relative flex flex-col lg:flex-row justify-between items-start bg-white shadow-md rounded-xl p-6 mb-12">
        <p className="text-sm leading-7 max-w-4xl">
          Welcome To The Host Academy, The Ultimate Platform For Hosts Looking To Create Exceptional And Unforgettable Experiences. Our Mission Is To Provide You With The Knowledge, Tools, And Resources To Elevate Your Hosting Skills And Offer Truly Unique And Memorable Experiences To Your Guests. From Learning How To Craft The Perfect Tour To Mastering Photography Techniques, Our Expert-Led Courses Will Help You Take Your Hosting Game To The Next Level. Join Us Today And Start Creating Experiences That Will Leave A Lasting Impression On Your Guests.
        </p>

        {/* Stacked Logos */}
        <div className="mt-6 lg:mt-0 flex flex-col items-end lg:ml-6">
          <Image
            src="/assets/images/brand/TabaaniLogo.png"
            alt="Logo Top"
            width={160}
            height={100}
            className="w-12 md:w-16"
          />
          <Image
            src="/assets/images/brand/AcademyLogo.png"
            alt="Logo Text"
            width={160}
            height={40}
            className="w-24 md:w-40 -mt-2"
          />
        </div>
      </div>

      {/* Footer Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Membership Certificate */}
        <div>
          <h3 className="font-semibold mb-4 text-[16px] uppercase">• Membership Certificate</h3>
          <Image
            src="/assets/images/brand/Certificate.png"
            alt="Certificate"
            width={491}
            height={333}
            className="rounded-md w-full max-w-[280px]"
          />
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-4 text-[16px] uppercase">• Categories</h3>
          <ul className="space-y-1 text-sm">
            {[
              "Ideation", "Business", "Finance & Accounting", "IT & Software",
              "Tour Management", "Personal Development", "Design Experiences",
              "Marketing", "Lifestyle", "Photography & Video", "Security",
            ].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Quick Access */}
        <div>
          <h3 className="font-semibold mb-4 text-[16px] uppercase">• Quick Access</h3>
          <ul className="space-y-1 text-sm">
            {[
              "What We Offer", "Careers", "Leadership", "About", "Catalog", "Degrees",
              "For Enterprise", "For Government", "For Campus", "Become A Partner",
              "Terms", "Accessibility",
            ].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* New Comments */}
        <div>
          <h3 className="font-semibold mb-4 text-[16px] uppercase">• New Comment</h3>
          <div className="space-y-3 text-sm">
            {[
              {
                name: "Ellsmartx",
                text: "How Nice Does This Look! I Feel It Should Be Delicious,...",
              },
              {
                name: "Cassia",
                text: "Take A Rest, I'll Be Cheer Up You Again In 2 Next Game Go G...",
              },
              {
                name: "Amanda",
                text: "You Were Stunning Today, Jan! 💗 Great Match 👍🏼",
              },
              {
                name: "Denis Simonassi",
                text: "It Was A Great Match Today Janzi! You Did Great! 🇪🇸",
              },
            ].map((comment, i) => (
              <div key={i} className="bg-white p-3 rounded text-[#3e3232] shadow">
                <strong>{comment.name}</strong>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 pt-6 text-sm flex flex-col md:flex-row justify-between text-gray-500 border-t border-gray-300">
        <p>Privacy Policy | Terms & Conditions</p>
        <p className="mt-2 md:mt-0">All Copyright (C) 2022 Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
