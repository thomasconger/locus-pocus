import './Splash.css'
import conversation from '../assets/conversation.svg'

const Splash = () => {
  return (
    <section className="hero">
      <div>
        <h1>Magical Events for the here and now</h1>
        <p>When you host a meeting, your guests shouldn't fall asleep. Bring magic to your meetings with LocusPocus for dynamic, interactive, synergistic Q&A. </p>
        <div className="about-links-wrapper">
          <a href="https://github.com/thomasconger">Github</a>
          <a href="https://www.linkedin.com/in/thomasconger/">LinkedIn</a>
          <a href="http://tomconger.com/">Portfolio</a>
        </div>
      </div>
      <div className="hero-img-wrapper">
        <img src={conversation} alt="conversation" />
      </div>

    </section>
  )
}

export default Splash
