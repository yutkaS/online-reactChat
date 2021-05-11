export const MessagesList = ({messages}) => {
    let html = [];
    messages.forEach((e) => {
        const sender = Object.keys(e)[0];
        html.push(<div className={'message'}>{sender}:{e[sender]}</div>);
    })
    return html
}