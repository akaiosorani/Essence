
import React from 'react';
import ClassNames from 'classnames';
import './chip.less'; // require('!css!less!./chip.less');
 
class Chip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            value: '',
            classes: ClassNames(
                'chips',
                this.props.classes,
                this.props.className
            )
        };
    }

    selectContact(data) {
        this.setState({
            selected: data.index,
            value: data.value
        });
    }

    renderContact() {
        let self = this;
        let contacts = null;
        let contact = (this.props.data && this.props.data.contact) ? this.props.data.contact : false;

        if (contact) {
            contacts = React.Children.map(contact, function (child, key) {
                let selectedClass = self.state.selected === key ? ' selected' : '';

                return (
                    <li 
                        onClick={self.selectContact.bind(self, {index: key, value: child} )}
                        onTouch={self.selectContact.bind(self, {index: key, value: child} )}
                        key={'chip-contact-'+key} 
                        className={'contact' + (key === 0 ? ' first' : '') + selectedClass}>
                        {child}
                        {(key === 0 ? (<span>x</span>) : '')}
                    </li>
                )
            });
        }

        return (contacts);
    }

    renderIcon() {
        return (
            this.props.data.icon ? 
            <span className={'icon'}>{this.props.data.icon}</span> :
            <span className={'empty'} /> 
        );
    }

    handleClose() {
        if (this.props.data && this.props.data.onClose) {
            // +hide chip
        }
        return (this.props.data && this.props.data.onClose) ? this.props.data.onClose() : null;
    }

    renderClose() {
        return (
            this.props.data.deletable ? <a href={'#!'} onClick={this.handleClose.bind(this)} className={'deletable'} /> : null
        );
    }

    renderInput() {
        return (
            <input defaulValue={this.state.value} type={'hidden'} name={ (this.props.data && this.props.data.name) ? this.props.data.name : 'chip'} />
        );
    }

    renderChildren() {
        return (
            <li key={'chip-item'} ref={(ref) => this.chipItem = ref}>
                {this.renderIcon()}
                {this.props.data.text}
                {this.renderClose()}
            </li>
        )   
    }

    render() {
        return (
            <span>
                {this.renderInput()}
                <ul key={'chip-list'} className={this.state.classes}>
                    {this.renderChildren()}
                </ul>
            </span>
        );
    }
}

export default Chip;