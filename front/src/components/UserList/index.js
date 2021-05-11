export const UsersList = ({users}) => {
    let html = [];
    users.forEach((user) => {
        html.push(<div className={'user'}>{user}</div>);
    })
    return html
}