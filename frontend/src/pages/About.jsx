import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const About = () => {
  return (
    <div className="about-page">
      <section
        className="about-header text-center py-16 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-photo/travel-concept-with-landmarks_23-2149153256.jpg?t=st=1734459512~exp=1734463112~hmac=956199774261d513cea7b1861f7343dcc4bcdc9298fbcf1c82e3028ab2da7f18&w=1800)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <motion.h1
          className="text-white text-4xl font-bold relative z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span className="text-blue-400">TripGo</span>
        </motion.h1>
        <motion.p
          className="text-white mt-4 text-lg relative z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Your Trusted Travel Agency for Seamless Booking Experiences
        </motion.p>
      </section>

      <section className="about-intro py-16 px-4 bg-slate-50 dark:bg-[#161616] rounded-3xl my-8">
        <motion.div
          className="container mx-auto text-center max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl font-bold mb-4 text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            About <span className="text-tripgo-gradient">TripGo</span>
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            TripGo is a leading travel agency offering personalized booking
            experiences to help travelers plan their perfect vacation. With a
            wide range of tours, activities, and accommodations, we make your
            travel dreams come true.
          </motion.p>
        </motion.div>
      </section>

      <section className="our-mission py-16">
        <motion.div
          className="container mx-auto text-center max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl font-bold mb-4 text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Our <span className="text-tripgo-gradient">Mission</span>
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Our mission is to provide seamless, reliable, and hassle-free travel
            booking services that empower our customers to explore the world
            with ease. We strive to offer exceptional customer service and the
            best travel deals.
          </motion.p>
        </motion.div>
      </section>

      <section className="why-choose-us py-16 px-4 bg-slate-50 dark:bg-[#161616] rounded-3xl my-8">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl font-bold mb-8 text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Why Choose <span className="text-tripgo-gradient">Us?</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                img: "https://img.freepik.com/free-photo/young-woman-sitting-coffee-table-with-laptop-home-working-on-projects_1150-18219.jpg?w=1380&t=st=1689821537~exp=1689822137~hmac=ea537998d858e2d68fa85c2165e8ac9c07eab70f89db67d943e48a3e84665e13",
                title: "Professional Service",
                desc: "We offer expert assistance and personalized guidance to ensure your trip is perfectly planned.",
              },
              {
                img: "https://img.freepik.com/free-photo/exotic-sunset-beach-ideal-relaxing-place_1150-18313.jpg?w=1380&t=st=1689821972~exp=1689822572~hmac=e4d945a3c49b09012d44a39b1b4b3a22cc2b6f700f9735360b171a320c2f29d5",
                title: "Unique Destinations",
                desc: "We curate exclusive travel packages to unique destinations across the world, ensuring a one-of-a-kind experience.",
              },
              {
                img: "https://img.freepik.com/free-photo/tourist-enjoying-luxury-resort-terrace-with-beautiful-view_1150-18335.jpg?w=1380&t=st=1689822102~exp=1689822702~hmac=573d74584f5e647b90fcbd2e91c8a7f313e0b3f438742970de8763fc7be2f215",
                title: "Affordable Prices",
                desc: "We ensure our customers get the best value for their money, offering competitive rates for every trip.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-[#202020] border border-slate-200/80 dark:border-white/10 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.3, duration: 0.8 }}
              >
                <img
                  className="rounded-xl mb-4 w-full h-48 object-cover"
                  src={item.img}
                  alt={item.title}
                />
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="our-team py-16">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Meet Our <span className="text-blue-500">Team</span>
          </motion.h2>
          <p className="text-lg mb-8">
            Our team is dedicated to making your travel experiences
            unforgettable. We are experts in travel planning and passionate
            about helping you discover the best destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              {
                img: "https://img.freepik.com/free-photo/smiling-young-travel-agent-holding-travel-book-while-working-office_1150-18351.jpg?w=1380&t=st=1689822301~exp=1689822901~hmac=fd79c254f2a30fc1ad4fa28cc5e225e99f4232f9db184e00d5e20b27ff51d426",
                name: "Jane Doe",
                title: "Travel Consultant",
              },
              {
                img: "https://img.freepik.com/free-photo/cheerful-young-tourist-student-smiling-camera-outdoor_1150-18412.jpg?w=1380&t=st=1689822402~exp=1689823002~hmac=6177bbd4170abf3788d0bc6fc9ef62ff1b71c5791ec59001c0d50fa04a4d3e78",
                name: "John Smith",
                title: "Travel Specialist",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="team-member w-1/3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.3, duration: 0.8 }}
              >
                <img
                  className="rounded-full mb-4"
                  src={item.img}
                  alt={item.name}
                />
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p>{item.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="contact-info py-16 px-4 bg-slate-50 dark:bg-[#161616] rounded-3xl my-8 text-center">
        <motion.div
          className="container mx-auto max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl font-bold mb-4 text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Get in <span className="text-tripgo-gradient">Touch</span>
          </motion.h2>
          <p className="text-lg mb-10 text-slate-500 dark:text-slate-400">
            Have any questions or need help with your booking? We're here to
            assist you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Mail className="w-6 h-6" />,
                title: "Email",
                content: "contact@tripgo.com",
              },
              {
                icon: <Phone className="w-6 h-6" />,
                title: "Phone",
                content: "+91-9130045670",
              },
              {
                icon: <MapPin className="w-6 h-6" />,
                title: "Address",
                content: "Ghaziabad, India",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-[#202020] border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col items-center"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-white/10 text-brand-blue dark:text-cyan-400 flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold mb-1 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.content}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="mailto:contact@tripgo.com"
              className="inline-block px-8 py-3 bg-tripgo-gradient text-white rounded-xl font-bold shadow-md shadow-brand-blue/25 hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
