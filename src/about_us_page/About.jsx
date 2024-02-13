import React from 'react'
import style from "./about.module.css";
import Header from '../components/header/Header';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const About = () => {
  return (
    <div id='About'>
        <Header/>
        <Navbar/>
        <div className={style.aboutContent}>
          <div className={style.wrapper}>
            <p>How do you prevent a travesty? You shed light on it and give the people what they need to protect themselves and their families. You give them Black Money Movement!</p>

        <div className={style.grid2}>
          <div className={style.first}>
            <img src="https://bmm2022.com/wp-content/uploads/2023/07/BMM-Logo-2.jpeg" alt="" />
          </div>
          <div className={style.second}>
            <p>Sol: ” I was asleep one night. I was awakened like one would be if you were bumped or you heard your name called while sleeping. The time was maybe 2 or 3 AM, when I was awakened by words being spoken. I reached to the side of my bed and grabbed a piece of paper and a pen, because it was so dark and I was still half asleep, I wrote what I heard and dropped the paper on the floor, roll over and went back to sleep. Later that morning, I remembered waking up in the middle of the night and writing something down, so I looked on the side of my bed and on the floor there was a receipt with writing on it. I picked it up and read the words Black Money Movement. I thought, what is this?”</p>
            <p>I was given a gift that night in 2022, that has opened itself up to me to reveal its purpose, to help save the African American Family from the projections of the year 2053. Economists have projected that the median wealth income of African Americans will be zero by that time; the fire was ignited!</p>
          </div>
        </div>

        <div className={style.grid1}>
          <hr />
          <p>The purpose of Black Money Movement is to help Black Families learn how to build wealth, how to unite for this common cause, and how to keep our dollars circulating within our community for years. If you have every felt the desire to participate in the growth and empowerment of The Black Man and Black Woman, you are in the right place!</p>
          <hr />
        </div>

        <div className={style.testimonial}>
          <div className={style.row}>
            <div className={style.imgContainer}>
              <img src="https://bmm2022.com/wp-content/uploads/2023/07/Sol.jpeg" alt="" srcset="" />
            </div>
            <h2 className={style.name}>Solanke Bomani</h2>
            <h3>Founder</h3>
            <p>Solanke “Sol” Bomani is a visionary and has been all of her life. In all that she has done, her focus remains the same which is celebrating culture, diversity and inclusion, and bridging gaps to minimize the ignorance associated with racism, classism, and the like. Her work includes Sol’s Multicultural Expressions and Marketplace, Candlelight Oasis, Mother’s of the Earth United, Innovative Artist Mark, and so many more. She started a Financial Services Business in 2021 and has been educating people about wealth building ever since. She is a mother of three, has a heart of service, and is a leader, she’s instinctive, and also very creative and driven to do good in this world.</p>
          </div>
          <div className={style.row}>
            <div className={style.imgContainer}>
              <img src="https://bmm2022.com/wp-content/uploads/2023/07/Thomas.jpeg" alt="" srcset="" />
            </div>
            <h2 className={style.name}>Solanke Bomani</h2>
            <h3>Founder</h3>
            <p>Solanke “Sol” Bomani is a visionary and has been all of her life. In all that she has done, her focus remains the same which is celebrating culture, diversity and inclusion, and bridging gaps to minimize the ignorance associated with racism, classism, and the like. Her work includes Sol’s Multicultural Expressions and Marketplace, Candlelight Oasis, Mother’s of the Earth United, Innovative Artist Mark, and so many more. She started a Financial Services Business in 2021 and has been educating people about wealth building ever since. She is a mother of three, has a heart of service, and is a leader, she’s instinctive, and also very creative and driven to do good in this world.</p>
          </div>
          <div className={style.row}>
            <div className={style.imgContainer}>
              <img src="https://bmm2022.com/wp-content/uploads/2023/07/Niara-Brown.jpeg" alt="" srcset="" />
            </div>
            <h2 className={style.name}>Solanke Bomani</h2>
            <h3>Founder</h3>
            <p>Solanke “Sol” Bomani is a visionary and has been all of her life. In all that she has done, her focus remains the same which is celebrating culture, diversity and inclusion, and bridging gaps to minimize the ignorance associated with racism, classism, and the like. Her work includes Sol’s Multicultural Expressions and Marketplace, Candlelight Oasis, Mother’s of the Earth United, Innovative Artist Mark, and so many more. She started a Financial Services Business in 2021 and has been educating people about wealth building ever since. She is a mother of three, has a heart of service, and is a leader, she’s instinctive, and also very creative and driven to do good in this world.</p>
          </div>

        </div>
        </div>
        </div>
        <Footer/>
    </div>
  )
}

export default About
