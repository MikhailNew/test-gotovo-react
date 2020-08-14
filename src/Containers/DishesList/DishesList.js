import React, { Component } from 'react'
import './DishesList.css'
import { connect } from 'react-redux'
import Loader from '../../Components/UI/Loader/Loader'
import {fetchDishes} from '../../store/actions/dish'

class DishesList extends Component {

    renderDishes () {
        return Object.keys(this.props.dishes).map((dish, index) => {
            const params = this.props.dishes[dish]
            if (params.dishList.length !== 0) {
                return (
                    <div key={index}>
                        <h2>{params.title}</h2>
                        <>
                            {params.dishList.map((item, index) => {
                                return (
                                    <div key={index} className="dish">
                                        <img alt="Баклажаны" src="https://ucarecdn.com/5684a414-3f2d-4355-9f3a-8e23af4af07b/-/resize/x360/-/format/auto/" className="dish__picture"></img>
                                        <div className="dish__description">
                                            <div className="dish__description-top">
                                                <h3>
                                                    {item.dishName}&nbsp;
                                                    <small>{item.weight}&nbsp;г</small>    
                                                </h3>
                                            </div>
                                            <div className="dish__description-bottom">
                                                <button type="button" disabled className="dish__description-btn">
                                                    {item.price}&nbsp;р
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    </div>
                )
            }
        })
    }

    async componentDidMount () {
        this.props.fetchDishes()
    }

    render () {
        return (
            <div className="DishesList">
                <div className="container">
                    {
                        this.props.loading && this.props.dishes.length !== 0
                        ? <Loader />
                        : this.renderDishes()
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        dishes: state.dish.dishes,
        loading: state.dish.loading
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchDishes: () => dispatch(fetchDishes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishesList)