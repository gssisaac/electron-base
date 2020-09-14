# Strum Electron

## Start

Dependency install
```
yarn
```

Development mode
```
yarn dev
```

Build
```
yarn build
```

Prod mode run
```
yarn start
```

## Strum Modal Doc

### step 1.

Set Modal

import { GeneralModal } from './Shared/StrumModal/Modals'

```
<GeneralModal>
  ...Items
</GeneralModal>
```

| Modal | Discription |
|---|:---:|
| GeneralModal | Basic Modal |
| FilterModal | Item is filtered by title props |
| TabModal (working..) | SomeModals are changed by tabs |

### step 2.

required props set

| prop | type |
|---|:---:|
| isOpen | boolean |
| position | {top: string, left: string, right: string, bottom: string} |
| width | number |
| height | number |
| closeModal | func |

```
const modalPosition = {
  top: '50px',
  left: '50px',
  right: 'auto',
  bottom: 'auto'
}

<GeneralModal 
  position={ modalPosition } 
  closeModal={() => { 
    this.setState({ isOpen: false })
  }} 
  isOpen={ this.state.isOpen } 
  width={ 220 } 
  height={ 600 }
/>
```

### step 3

Set Items

import {Divider, GeneralItem, SubTitleItem} from './Shared/StrumModal/Items'

*GeneralItem*

| prop | type | required | description | example |
|:---:|:---:|:---:|:---:|:---:|
| title | string | required | item title | 'About Strum' |
| icon | string | not | insert icon in left on title. | '../strum_logo.png' |
| option | string | not | insert option (behind description) | 'switch' |
| optionProps | object | not | props for each options | {onChange: () => {}, ...} |
| onClick | func | not | item click event | () => {alert('click me!')} |

example )
```
<GeneralItem title={"Page Lock"} option={'switch'} optionProps={{checked: this.state.isPageLock, onChange: () => this.setState({isPageLock: !this.state.isPageLock})}}/>
```

*SubTitleItem*

| prop | type | required | description | example |
|:---:|:---:|:---:|:---:|:---:|
| title | string | required | item title | 'About Strum' |
| subTitle | string | required | item subtitle | 'by Dany' |
| option | same | not | same | same |
| optionProps | not | same | same | same|
| onClick | same | not | same | same |
| icon | same | not | same | same |
| fullIcon | string | not | Full size icon | '../strum_big_logo.png' |

example )
```
<SubTitleItem onClick={()=>{alert('hello3')}} icon={'../abc.png'} title={'Export'} subTitle={'PDF, Markdown, HTML'} />
```

*Divider*

Divide menu groups

example )

```
<Divder />
```

### step 4

check the optionProps

| option | props |
|:---:|:---:|
| switch | {onChange: func, checked: boolean} |
| discription | {discription: string} |

if you want use option, you must set optionProps.

example )
```
<GeneralItem title={"Small Text"} option={'switch'} optionProps={{checked: this.state.isSmallText, onChange: () => this.setState({isSmallText: !this.state.isSmallText})}}/>
```

### step 5

Enjoy :)

```
<GeneralModal {...props} >
  <GeneralItem {...GeneralItemProps} />
  <Divider />
  <SubTitleItem {...SubTitleItemProps} />
</GeneralModal>
```