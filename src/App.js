import Component from 'inferno-component';
import './registerServiceWorker';
import Checkbox from './Checkbox';
import './App.css';
import logo from './logo.png';
import github from './github.svg';

const gameObjects = [
  {
    name: 'doors',
    $assetKey: 'Porte',
    displayName: 'Doors'
  },
  {
    name: 'ropeBridges',
    $assetKey: 'RopeBridgeFrame',
    displayName: 'Rope Bridges',
  },
  {
    name: 'lanterns',
    $assetKey: 'Lantern',
    displayName: 'Lanterns',
  },
  {
    name: 'sentinel',
    $assetKey: 'Sentinel',
    displayName: 'Sentinel Ward',
  },
  {
    name: 'healing',
    $assetKey: 'Healing',
    displayName: 'Healing Ward',
  },
  {
    name: 'catapult',
    $assetKey: 'Catapulte',
    displayName: 'Catapult',
  }
];

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { uploadedGameObjects: '', extractedObjects: '' }

    this.selectAll = this.selectAll.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateCheckbox = this.updateCheckbox.bind(this)
    this.updateUserGameObjects = this.updateUserGameObjects.bind(this)
  }

  selectAll() {
    this.setState({
      ...gameObjects.reduce((acc, elem) => {
        acc[elem.name] = true
        return acc
      }, {})
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = []
    try {
      data = JSON.parse(this.state.uploadedGameObjects)

      if (!Array.isArray(data)) {
        throw 'gameobjects.json was expected to be an array of objects, but instead got type: ' + data.constructor.name
      }
    } catch(e) {
      alert(e)
      return
    }

    let keysToKeep = gameObjects.reduce((acc, elem) => {
      if (this.state[elem.name]) {
        acc.push(elem.$assetKey)
      }
      return acc
    }, [])

    // Only take the objects that have a $assetKey that contains one of our keysToKeep
    let extractedObjects = data.filter(x =>
      x.$assetKey && keysToKeep.some(key => x.$assetKey.includes(key))
    )

    this.setState({
      extractedObjects: JSON.stringify(extractedObjects).slice(1,-1)
    })
  }

  updateCheckbox(name) {
    this.setState({
      [name]: !this.state[name],
    })
  }

  updateUserGameObjects(event) {
    this.setState({ uploadedGameObjects: event.target.value })
  }

  componentWillMount() {
    this.selectAll()
  }

  render() {
    return (
      <div>
        <div className='App-header'>
          <div class='container'>
            <a href="//www.castlestory.net">
              <img src={logo} className='App-logo' alt='Castle Story' />
            </a>
            <h1>Game Object Extractor</h1>
            <p>A simple tool to help you pull out only the objects you want from <code>gameobjects.json</code> so that you can transfer them into a maps <code>gameobjects.json</code> without it breaking or having all these extra objects (bricktron spirits, crystal spawns, etc) you don't want.</p>
          </div>
        </div>

        <div class='container'>
          <div className='App-intro'>
            <p>To get started, select the objects you want to keep and paste the contents of your <code>gameobjects.json</code> below.</p>
            <form onSubmit={this.handleSubmit}>
              {gameObjects.map(g =>
                  <Checkbox key={g.name} label={g.displayName} checked={this.state[g.name]} onChange={() => this.updateCheckbox(g.name)} />
                )
              }
              <br />
              <br />
              <textarea value={this.state.uploadedGameObjects} onChange={this.updateUserGameObjects}></textarea>
              <br />
              <button type='submit'>EXTRACT OBJECTS</button>
            </form>
            <p>Now just copy the outputted JSON below and paste it at the end of the <code>gameobjects.json</code> for your map, just before the last character - which would be a <code>]</code> (make sure you put a comma before the last <code>}</code> as well - you can validate your JSON online)</p>
            <textarea value={this.state.extractedObjects} readonly></textarea>
          </div>

          <hr/>
          <h3>Notes</h3>
          <ul>
            <li>The planks for Rope Bridges are stored in <code>PlacedBlocks.json</code>, so make sure to copy that across otherwise you'll just have rope!</li>
            <li>The outputted JSON is invalid because I've unwrapped it from it's array, make sure to insert it inside of the array in <code>gameobjects.json</code></li>
          </ul>
        </div>

        <div className='footer'>
          <div>
            <a href="//github.com/wemyss/castle-story">
              <img src={github} alt="Github repo" class="social-icon" />
            </a>
          </div>
          <br/>
          <small>Developed by <a href="https://wemyss.github.io">Sam Wemyss</a></small>
        </div>
      </div>
    )
  }
}

export default App;
