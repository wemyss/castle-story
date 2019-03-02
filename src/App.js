import Component from 'inferno-component'
import './registerServiceWorker'
import CheckboxList from './CheckboxList'
import './App.css'
import logo from './logo.png'
import github from './github.svg'


// 👋 Hello!
// All new game objects should be inserted in this object below
// Things are to be grouped by what section they exist in the object panel in castle story
const gameObjects = [
  // Storage
  {
    name: 'Storage',
    items: [
      {
        // This is the key in the gameobjects.json file. It can also be a substring of the key,
        // take Pylon for example which can either be `PylonGround` or `PylonWall`.
        assetKey: 'Palette',
        // The name as displayed when you view the object in castle story.
        // This is used for displaying in the UI as it's a name people should recognise.
        displayName: 'Stockpile',
      },
      {
        assetKey: 'Toolrack',
        displayName: 'Weapons Stand',
      },
    ],
  },

  // Production
  {
    name: 'Production',
    items: [
      {
        assetKey: 'ChoppingBlock',
        displayName: 'Chopping Block',
      },
      {
        assetKey: 'Furnace',
        displayName: 'Furnace',
      },
      {
        assetKey: 'Loom',
        displayName: 'Loom',
      },
    ],
  },

  // Crafting
  {
    name: 'Crafting',
    items: [
      {
        assetKey: 'Altar',
        displayName: 'Altar',
      },
      {
        assetKey: 'Forge',
        displayName: 'Forge',
      },
      {
        assetKey: 'Lab',
        displayName: 'Laboratory',
      },
      {
        assetKey: 'MachineShop',
        displayName: 'Machine Shop',
      },
      {
        assetKey: 'Workbench',
        displayName: 'Workbench',
      },
    ],
  },

  // Structures
  {
    name: 'Structures',
    items:[
      {
        assetKey: 'Baril',
        displayName: 'Barrel',
      },
      {
        assetKey: 'BearTrap',
        displayName: 'Bear Trap',
      },
      {
        assetKey: 'Catapulte',
        displayName: 'Catapult',
      },
      {
        assetKey: 'ShakyDoor',
        displayName: 'Rickety Door',
      },
      {
        assetKey: 'Porte',
        displayName: 'Door',
      },
      {
        assetKey: 'HeavyDoor',
        displayName: 'Reinforced Door',
      },
      {
        assetKey: 'RopeBridgeFrame',
        displayName: 'Rope Bridge',
      },
    ],
  },

  // Wards
  {
    name: 'Wards',
    items: [
      {
        assetKey: 'Capture',
        displayName: 'Capture',
      },
      {
        assetKey: 'Healing',
        displayName: 'Healing',
      },
      {
        assetKey: 'Lantern',
        displayName: 'Lantern',
      },
      {
        assetKey: 'Pylon',
        displayName: 'Pylon',
      },
      {
        assetKey: 'Sentinel',
        displayName: 'Sentinel',
      },
    ],
  },

  // Decorations
  {
    name: 'Decorations',
    items: [
      {
        assetKey: 'Window',
        displayName: 'Window',
      },
      {
        assetKey: 'DoubleWindow',
        displayName: 'Double Window',
      },
      {
        assetKey: 'KnightStatue',
        displayName: 'Knight Statue',
      },
      {
        assetKey: 'PaintingSmall',
        displayName: 'Small Painting',
      },
      {
        assetKey: 'PaintingBig',
        displayName: 'Big Painting'
      },
      {
        assetKey: 'PaintingWide',
        displayName: 'Wide Painting',
      },
      {
        assetKey: 'PaintingTall',
        displayName: 'Tall Painting',
      },
    ]
  }
]


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
      ...gameObjects.reduce((acc, group) => {
        acc[group.name] = {}
        for (let elem of group.items) {
          acc[group.name][elem.assetKey] = true
        }
        return acc
      }, {})
    })
  }

  handleSubmit(event) {
    event.preventDefault()

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

    // Get the currently ticked gameobject keys the user wants to keep
    let keysToKeep = gameObjects.reduce((acc, group) => {
      for (let elem of group.items) {
        if (this.state[group.name][elem.assetKey]) {
          acc.push(elem.assetKey)
        }
      }
      return acc
    }, [])

    // Only take the objects that have an assetKey that _contains_ one of our keysToKeep
    let extractedObjects = data.filter(x =>
      x.$assetKey && keysToKeep.some(key => x.$assetKey.includes(key))
    )

    this.setState({
      extractedObjects: JSON.stringify(extractedObjects).slice(1,-1)
    })
  }

  updateCheckbox(groupName, key) {
    this.setState(prevState => {
      return {
        ...prevState,
        [groupName]: {
          ...prevState[groupName],
          [key]: !prevState[groupName][key],
        }
      }
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
            <p>A simple tool to help you pull out only the objects you want from a saved games' <code>gameobjects.json</code>, so that you can transfer them into a maps <code>gameobjects.json</code> without it breaking or having all these extra weird objects (bricktron spirits, crystal spawns, etc) you don't want.</p>
          </div>
        </div>

        <div class='container'>
          <div className='App-intro'>
            <p>To get started, select the objects you want to keep and paste the contents of your <code>gameobjects.json</code> from your saved game below.</p>
            <form onSubmit={this.handleSubmit}>
              <div className='options-list'>
                {gameObjects.map(group =>
                  <CheckboxList
                    key={group.name}
                    group={group}
                    groupState={this.state[group.name]}
                    onChange={this.updateCheckbox}
                  />
                )}
              </div>
              <textarea value={this.state.uploadedGameObjects} onChange={this.updateUserGameObjects}></textarea>
              <br />
              <button type='submit'>EXTRACT OBJECTS</button>
            </form>
            <p>Now just copy the outputted JSON below and paste it at the end of the <code>gameobjects.json</code> for your <b>map</b>, just before the last character - which would be a <code>]</code> (make sure you put a comma before the last <code>}</code> as well - you can validate your JSON online)</p>
            <textarea value={this.state.extractedObjects} readonly></textarea>
          </div>

          <hr/>
          <h3>Notes</h3>
          <ul>
            <li>The planks for Rope Bridges are stored in <code>PlacedBlocks.json</code>, so make sure to copy that across otherwise you'll just have rope!</li>
            <li>The outputted JSON is invalid because I've unwrapped it from it's array, make sure to insert it <b>inside</b> of the array in <code>gameobjects.json</code></li>
            <li>You can <a href="https://github.com/wemyss/castle-story/issues/new">raise an issue</a> on Github if you have any problems with this tool</li>
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

export default App
