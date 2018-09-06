import React from 'react'

export default class PriceSlider extends React.Component {
    constructor(props) {
        super(props)

        this.leftCircle = React.createRef()
        this.rightCircle = React.createRef()
        this.line = React.createRef()
        this.coloredLine = React.createRef()

        this.state = {
            rightCircleLeft: 200,
            leftCircleLeft: 0,
            coloredLineWidth: 0,
            coloredLineLeft: 0,
            totalWidth: 0
        }
    }

    componentDidMount() {
        const width = this.line.current.getBoundingClientRect().width //total width of the slider
        const xLeft = this.priceToOffset(this.props.minPrice) //(width / this.props.maxValue) * this.props.minPrice
        const xRight = this.priceToOffset(this.props.maxPrice) //(width / this.props.maxValue) * this.props.maxPrice

        this.setState({
            totalWidth: width,
            rightCircleLeft: xRight,
            leftCircleLeft: xLeft,
            coloredLineLeft: xLeft,
            coloredLineWidth: xRight - xLeft
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.maxPrice !== prevProps.maxPrice) {
            const newRightX = this.priceToOffset(this.props.maxPrice)

            this.setState(prevState => ({
                rightCircleLeft: newRightX,
                coloredLineLeft: prevState.leftCircleLeft,
                coloredLineWidth: newRightX - prevState.leftCircleLeft,                
            }))
        }

        if (this.props.minPrice !== prevProps.minPrice) {
            const newLeftX = this.priceToOffset(this.props.minPrice)

            this.setState(prevState => ({
                leftCircleLeft: newLeftX,
                coloredLineLeft: newLeftX,
                coloredLineWidth: prevState.rightCircleLeft - newLeftX,
            }))            
        }
    }

    priceToOffset = (price) => {
        const width = this.line.current.getBoundingClientRect().width
        return (width / this.props.maxValue) * price
    }

    onInput = (e, key) => {
        console.log(e.target.value)
        const val = parseInt(e.target.value)
        console.log(val)
        if (Number.isInteger(val) && val >= 0) {
            this.props.onRangeChange(key, val)
        }
    }

    handleContainerClick = (e) => {
        const mX = e.clientX //mouseX
        const leftRect = this.leftCircle.current.getBoundingClientRect() //left circle boundaries
        const rightRect = this.rightCircle.current.getBoundingClientRect() //right circle boundaries

        const lX = leftRect.left 
        const rX = rightRect.left + rightRect.width

        const distLR = rightRect.left - (leftRect.left + leftRect.width) //distance between the circles
        const center = leftRect.left + leftRect.width + distLR / 2 //middle point

        // determining where the click was made
        if (mX < lX) {
            //to the left of the left circle
            this.props.onRangeChange('minPrice', -1 * this.props.step + this.props.minPrice)
        } else if (mX > lX & mX < center) {
            //to the right of the left circle, but to the left of the middle point between the circles
            this.props.onRangeChange('minPrice', this.props.step + this.props.minPrice)
        } else if (mX > center & mX < rX) {
            //to the left of the right circle, but to the right of the middle point between the circles
            this.props.onRangeChange('maxPrice', -1 * this.props.step + this.props.maxPrice)
        } else if (mX > center & mX > rX) {
            //to the right of the right circle
            this.props.onRangeChange('maxPrice', this.props.step + this.props.maxPrice)
        }
    }

    render() {
        return (
            <div className="price-slider">
                <div className="circle-container" onClick={this.handleContainerClick}>
                    <div className="circle-1" style={{left: this.state.leftCircleLeft}} ref={this.leftCircle}></div>
                    <div className="line-white" ref={this.line}></div>
                    <div className="line-colored" style={{ width: this.state.coloredLineWidth, left: this.state.coloredLineLeft }} ref={this.coloredLine}></div>
                    <div className="circle-2" style={{left: this.state.rightCircleLeft}} ref={this.rightCircle}></div>
                </div>
                <div className="counter">
                    <input type="text" className="input-1" value={this.props.minPrice} onChange={(e) => this.onInput(e, 'minPrice')} />
                    <div className="input-separator"></div>
                    <input type="text" className="input-2" value={this.props.maxPrice} onChange={(e) => this.onInput(e, 'maxPrice')} />
                </div>
            </div>
        )
    }
}