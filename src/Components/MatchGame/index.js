import {Component} from 'react'
import ThumbnailImages from '../ThumbnailImages'
import './index.css'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isGameOn: true,
      score: 0,
      second: 60,
      matchImage:
        'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
      activetab: 'FRUIT',
      matchImgId: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
    }

    this.changeTab = e => {
      this.setState({activetab: e.target.id})
    }

    this.randomImg = () => {
      const {imagesList} = this.props
      const randomNum = Math.floor(Math.random() * imagesList.length)
      const obj = imagesList[randomNum]
      this.setState({
        matchImage: obj.imageUrl,
        matchImgId: obj.id,
      })
    }

    this.clickedthumbImg = id => {
      const {matchImgId} = this.state

      if (matchImgId === id) {
        this.setState(prev => ({
          score: prev.score + 1,
        }))
        this.randomImg()
      } else {
        this.setState({isGameOn: false})
        this.componentWillUnmount()
      }
    }

    this.resetState = () => {
      this.setState({
        isGameOn: true,
        score: 0,
        second: 60,
        matchImage:
          'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
        activetab: 'FRUIT',
        matchImgId: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
      })
      this.startTimer()
    }

    this.startTimer = () => {
      this.intervalId = setInterval(() => {
        const {second} = this.state
        if (second !== 0) {
          this.setState(prev => ({
            second: prev.second - 1,
          }))
        } else {
          this.stopTimer()
          this.setState({
            isGameOn: false,
          })
        }
      }, 1000)
    }
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  stopTimer = () => {
    clearInterval(this.intervalId)
  }

  render() {
    const {isGameOn, score, second, matchImage, activetab} = this.state
    const {tabsList, imagesList} = this.props
    return (
      <>
        <nav className="nav-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            className="logo"
            alt="website logo"
          />
          <ul className="scoreAndTime">
            <li>
              <p className="timeAndScore">
                Score:<span className="timeAndScore">{score}</span>
              </p>
            </li>
            <div className="timer-img-and-time">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-img"
              />

              <p className="timeAndScore">{second} sec</p>
            </div>
          </ul>
        </nav>
        <div className="bgContainer">
          {isGameOn ? (
            <div className="match-img-container">
              <img src={matchImage} alt="match" className="match-img" />
              <ul className="tabList">
                {tabsList.map(each => (
                  <li
                    className={each.tabId === activetab ? 'activetab' : ''}
                    key={each.tabId}
                  >
                    <button
                      type="button"
                      id={each.tabId}
                      onClick={this.changeTab}
                    >
                      {each.displayText}
                    </button>
                  </li>
                ))}
              </ul>
              <ul className="thumbnail-container">
                {imagesList.map(
                  each =>
                    each.category === activetab && (
                      <ThumbnailImages
                        obj={each}
                        clickFunction={this.clickedthumbImg}
                        key={each.id}
                      />
                    ),
                )}
              </ul>
            </div>
          ) : (
            <div className="gameOver-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                alt=" trophy"
              />
              <p>YOUR SCORE</p>
              <p>{score}</p>
              <button
                className="reset-btn"
                type="button"
                onClick={this.resetState}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  alt="reset"
                />
                PLAY AGAIN
              </button>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default MatchGame
