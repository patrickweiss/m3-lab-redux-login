import React, { Component } from 'react';

export default class SimpleAsset extends Component {

    constructor(props) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            asset_delete_function: props.onDelete,
            asset_edit_mode: props.edit,
            asset_id: props.id,
            asset_name: props.name,
            asset_value: props.value
        }
    }

    render() {
        if (this.state.asset_edit_mode)
            return (
                <form onSubmit={this.handleSubmit} >
                    <label>
                        Name:<input type="text" name="name" value={this.state.asset_name} onChange={this.handleNameChange} />
                    </label>
                    <label>
                        Value: <input type="number" name="value" value={this.state.asset_value} onChange={this.handleValueChange} /> €
                    </label>
                    <input type="submit" value="Save" />
                </form>
            )
        else
            return (
                <div>
                    <p>{this.state.asset_name}: {this.state.asset_value} €
                        <button onClick={this.handleEdit}>edit</button>
                        <button onClick={this.state.asset_delete_function} id={this.state.asset_id}>sell or dispose</button>
                    </p>
                </div>
            )
    }

    handleNameChange(event) {
        this.setState({ asset_name: event.target.value });
    }

    handleValueChange(event) {
        this.setState({ asset_value: event.target.value });
    }

    handleSubmit(event) {
        this.setState({asset_edit_mode:false});
        event.preventDefault();
    }
    handleEdit() {
        this.setState({ asset_edit_mode: true });

    }
}