import React, {Component} from 'react';
import './DishCreator.css'
import Button from '../../Components/UI/Button/Button'
import {createControl, validate, validateForm} from '../../form/formFrame'
import Input from '../../Components/UI/Input/Input'
import Select from '../../Components/UI/Select/Select'
import { connect } from 'react-redux';
import {createDish, finishCreateDish} from '../../store/actions/create'

function createOptionControl (text) {
    return createControl({
        label: `${text}`,
        errorMessage: 'Значение не может быть пустым'
    }, {required: true})
}

function createFormControls () {
    return {
        dishName: createControl({
            label: 'Введите название блюда',
            errorMessage: 'Поле не может быть пустым'
        }, {required: true}),
        option1: createOptionControl('Цена (руб.)'),
        option2: createOptionControl('Вес (грамм)'),
        option3: {type: 'file'}
    }
}

class DishCreator extends Component {

    state = {
        cathegoria: 'Категория блюда',
        isFormValid: false,
        MealKind: {
            drink: 'drink',
            hotDrink: 'hotDrink',
            soup: 'soup',
            salad: 'salad',
            hot: 'hot',
            breakfast: 'breakfast',
            sauce: 'sauce',
            pastry: 'pastry',
            garnish: 'garnish',
        },
        formControls: createFormControls()
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addDishHandler = event => {
        event.preventDefault ()
        const {dishName, option1, option2, option3} = this.state.formControls
        const dishItem = { 
            dishName: dishName.value,
            cathegoria: this.state.cathegoria,
            price: option1.value,
            weight: option2.value,
            photo: option3.value
        }
        this.props.createDish (dishItem)
        this.setState ({
            cathegoria: 'Категория блюда',
            isFormValid: false,
            formControls: createFormControls()
        })
        this.props.finishCreateDish()
    }

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = value
        control.touched = true
        control.valid = validate(control.value, control.validation)
        formControls[controlName] = control
        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderInputs () {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <>
                    <Input
                        type={control.type}
                        key={index}
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)} 
                    />
                    {index === 0 ? <hr /> : null}
                </>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            cathegoria: event.target.value
        })
    }

    renderOptions () {
        return Object.keys(this.state.MealKind).map((itemKind) => {
            const kind = this.state.MealKind[itemKind]
            return {
                text: kind,
                value: kind
            }
        })
    }


    render () {
        const select = <Select
            label="Выберите категорию блюда"
            value={this.state.cathegoria}
            onChange={this.selectChangeHandler}
            options={this.renderOptions()}
        />

        return (
            <div className="DishCreator">
                <div>
                    <h1>Форма добавления блюда</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderInputs()}
                        {select}
                        <Button
                            type="success"
                            onClick={this.addDishHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить блюдо
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        dish: state.create.dish
    }
}

function mapDispatchToProps (dispatch) {
    return {
        createDish: item => dispatch(createDish(item)),
        finishCreateDish: () => dispatch(finishCreateDish())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishCreator)