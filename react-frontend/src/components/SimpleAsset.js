import React, { Component } from 'react';

export default class SimpleAsset extends Component {

    constructor(props) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            delete_function: props.onDelete,
            edit_mode: props.edit,
            asset: props.asset,
        }
    }

    render() {
        if (this.state.asset_edit_mode)
            return (
                <form onSubmit={this.handleSubmit} >
                    <label>
                        Name:<input type="text" name="name" value={this.state.asset.asset_name} onChange={this.handleNameChange} />
                    </label>
                    <label>
                        Value: <input type="number" name="value" value={this.state.asset.asset_value} onChange={this.handleValueChange} /> €
                    </label>
                    <input type="submit" value="Save" />
                </form>
            )
        else
            return (
                <div>
                    <p>{this.state.asset.asset_name}:{this.state.asset.asset_value} €
                        <button onClick={this.handleEdit}>edit</button>
                        <button onClick={this.state.delete_function} id={this.state.asset._id}>sell or dispose</button>
                    </p>
                </div>
            )
    }

    handleNameChange(event) {
        this.setState({
            asset: {
                asset_name: event.target.value,
                asset_value: this.state.asset.asset_value
            }
        });
    }

    handleValueChange(event) {
        this.setState({
            asset: {
                asset_name: this.state.asset.asset_name,
                asset_value: event.target.value
            }
        });
    }

    handleSubmit(event) {
        this.setState({ asset_edit_mode: false });
        event.preventDefault();
    }
    handleEdit() {
        this.setState({ asset_edit_mode: true });
    }
}