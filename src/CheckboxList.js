import Checkbox from './Checkbox'
import Component from 'inferno-component';
import './CheckboxList.css'

const checkboxShouldUpdate = (lastProps, nextProps) => nextProps.checked !== lastProps.checked

export default class CheckboxList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.groupState !== this.props.groupState
  }

  render() {
    const { group, groupState, onChange } = this.props

    return (
      <div class='CheckboxList'>
        <h4>{group.name}</h4>
        <ul>
          {group.items.map(item =>
            <li>
              <Checkbox key={item.assetKey}
                label={item.displayName}
                checked={groupState[item.assetKey]}
                onChange={() => onChange(group.name, item.assetKey)}
                onComponentShouldUpdate={checkboxShouldUpdate}
              />
            </li>
          )}
        </ul>
      </div>

    )
  }
}
