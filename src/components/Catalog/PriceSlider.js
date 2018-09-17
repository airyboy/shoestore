import React from 'react'

export default class PriceSlider extends React.Component {
    constructor(props) {
        super(props)

        this.leftCircle = React.createRef();
        this.rightCircle = React.createRef();
        this.line = React.createRef();
        this.container = React.createRef();
        this.coloredLine = React.createRef();

        this.state = {
            rightCircleLeft: 200,
            leftCircleLeft: 0,
            coloredLineWidth: 0,
            coloredLineLeft: 0,
            totalWidth: 0,
            circleDrag: null
        }
    }

    

    componentDidMount() {
        const width = this.line.current.getBoundingClientRect().width //total width of the slider
        const xLeft = this.priceToOffset(this.props.minPrice) 
        const xRight = this.priceToOffset(this.props.maxPrice) 

        this.setState({
            totalWidth: width - 13,
            rightCircleLeft: xRight,
            leftCircleLeft: xLeft,
            coloredLineLeft: xLeft,
            coloredLineWidth: xRight - xLeft
        })

        this.halfCircleWidth = this.leftCircle.current.getBoundingClientRect().width / 2

        this.leftCircle.current.ondragstart = () => { return false; }
        this.leftCircle.current.onselectstart = () => { return false; }

        this.rightCircle.current.ondragstart = () => { return false; }
        this.rightCircle.current.onselectstart = () => { return false; }

        document.addEventListener('mousemove', this.handleMouseMove)
        document.addEventListener('mouseup', this.handleMouseUp)
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
        if (e.target === this.leftCircle.current | e.target === this.rightCircle.current) return;

        const mX = e.clientX //mouseX
        const leftRect = this.leftCircle.current.getBoundingClientRect() //left circle boundaries
        const rightRect = this.rightCircle.current.getBoundingClientRect() //right circle boundaries

        const lX = leftRect.left + this.halfCircleWidth
        const rX = rightRect.left + rightRect.width - this.halfCircleWidth

        const distLR = rightRect.left - (leftRect.left + leftRect.width) //distance between the circles
        const center = leftRect.left + leftRect.width + distLR / 2 //middle point

        const pxPerStep = (this.state.totalWidth / (this.props.maxValue / this.props.step)) //rub in 1 px

        // determining where the click was made
        if (mX < lX) {
            const multiplier = Math.ceil(Math.abs(mX - lX) / pxPerStep)
            const calculatedPrice =  -1 * multiplier * this.props.step + this.props.minPrice;
            const newMinPrice = calculatedPrice >= 0 ? calculatedPrice : 0;

            //to the left of the left circle
            this.props.onRangeChange('minPrice', newMinPrice)
        } else if (mX > lX & mX < center) {
            const multiplier = Math.ceil(Math.abs(mX - lX) / pxPerStep)

            //to the right of the left circle, but to the left of the middle point between the circles
            this.props.onRangeChange('minPrice', multiplier * this.props.step + this.props.minPrice)
        } else if (mX > center & mX < rX) {
            const multiplier = Math.ceil(Math.abs(mX - rX) / pxPerStep)

            //to the left of the right circle, but to the right of the middle point between the circles
            this.props.onRangeChange('maxPrice', -1 * multiplier * this.props.step + this.props.maxPrice)
        } else if (mX > center & mX > rX) {
            const multiplier = Math.ceil(Math.abs(mX - rX) / pxPerStep)

            const calculatedPrice = multiplier * this.props.step + this.props.maxPrice;
            const newMaxPrice = calculatedPrice <= this.props.maxValue ? calculatedPrice : this.props.maxValue;

            //to the right of the right circle
            this.props.onRangeChange('maxPrice', newMaxPrice);
        }
    }

    handleMouseDown = (e, which) => {
        //only LMB
        if (e.button === 0) {
            this.setState({circleDrag: which})
        }
    }

    onSelectHandler = () => {
        console.log('select start')
        return false
    }

    handleMouseMove = (e) => {
        if (this.state.circleDrag) {
            const containerLeft = this.container.current.getBoundingClientRect().left;
            const relativeX = e.clientX - containerLeft;                

            if (this.state.circleDrag === 'left') {

                const rightmostX = this.rightCircle.current.getBoundingClientRect().left - containerLeft + this.halfCircleWidth;
                let newLeft = relativeX > this.halfCircleWidth ? relativeX : this.halfCircleWidth;
                newLeft = newLeft < rightmostX ? newLeft : rightmostX;
                this.setState(prevState => (
                    {
                        leftCircleLeft: newLeft - this.halfCircleWidth, 
                        coloredLineWidth: prevState.rightCircleLeft - newLeft,
                        coloredLineLeft: newLeft
                    }))
            }

            if (this.state.circleDrag === 'right') {
                const rightmostX = this.container.current.getBoundingClientRect().width - this.halfCircleWidth;
                const leftCircleRect = this.leftCircle.current.getBoundingClientRect();
                const leftmostX = leftCircleRect.left - containerLeft + this.halfCircleWidth;

                let newLeft = relativeX < rightmostX ? relativeX : rightmostX;
                newLeft = newLeft > leftmostX ? newLeft : leftmostX;
                this.setState(prevState => ({
                    rightCircleLeft: newLeft - this.halfCircleWidth,
                    coloredLineWidth: newLeft - prevState.leftCircleLeft 
                }))
            }
        }
    }

    handleMouseUp = () => {
        const pxPerStep = (this.state.totalWidth / (this.props.maxValue / this.props.step)); //rub in 1 px
        if (this.state.circleDrag === 'left') {
            const newMinPrice = this.props.step * Math.ceil(this.state.leftCircleLeft / pxPerStep)
            
            let newMinPriceRestricted = newMinPrice > 0 ? newMinPrice : 0
            newMinPriceRestricted = newMinPrice <= this.props.maxPrice ? newMinPriceRestricted : this.props.maxPrice

            this.props.onRangeChange('minPrice', newMinPriceRestricted)
        } else if (this.state.circleDrag === 'right') {
            const newMaxPrice = this.props.step * Math.ceil(this.state.rightCircleLeft / pxPerStep)

            let newMaxPriceRestricted = newMaxPrice > this.props.maxValue ? this.props.maxValue : newMaxPrice
            newMaxPriceRestricted = newMaxPriceRestricted >= this.props.minPrice ? newMaxPriceRestricted : this.props.minPrice
            this.props.onRangeChange('maxPrice', newMaxPriceRestricted)
        }

        this.setState({circleDrag: null})    
    }

    componentWillUnmount() {
        document.removeEventListener('mouseup', this.handleMouseUp)
        document.removeEventListener('mousemove', this.handleMouseMove)
    }

    render() {
        return (
            <div className="price-slider">
                <div className="circle-container" ref={this.container} onMouseDown={this.handleContainerClick}>
                    <div className="circle-1" style={{left: this.state.leftCircleLeft}} 
                        onMouseDown={(e) => this.handleMouseDown(e, 'left')}  
                        ref={this.leftCircle}></div>
                    <div className="line-white" ref={this.line}></div>
                    <div className="line-colored" style={{ width: this.state.coloredLineWidth, left: this.state.coloredLineLeft }} ref={this.coloredLine}></div>
                    <div className="circle-2" 
                        style={{left: this.state.rightCircleLeft}} 
                        onMouseDown={(e) => this.handleMouseDown(e, 'right')} 
                        ref={this.rightCircle}></div>
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