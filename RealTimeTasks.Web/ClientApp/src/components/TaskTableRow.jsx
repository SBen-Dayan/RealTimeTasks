import axios from "axios";

export default function TaskTableRow({ task: { id, title, user }, currentUserId }) {
    const claimed = user;
    const claimedByCurrentUser = claimed && user.id === currentUserId;

    const onButtonClick = async () => {
        if (!claimed) {
            axios.post('/api/task/claim', { id });
        } else if (claimedByCurrentUser) {
            axios.post('/api/task/deleteTask', { id });
        }
    }

    return <tr>
        <td>{title}</td>
        <td>
            <button
                className={!claimed ? 'btn btn-dark' :
                    claimedByCurrentUser ? 'btn btn-success' : 'btn btn-warning'}
                disabled={claimed && !claimedByCurrentUser}
                onClick={onButtonClick}>
                {!user ? 'Claim task' :
                    claimedByCurrentUser ? 'Task completed' : `${user.firstName} ${user.lastName} is doing this`}
            </button>
        </td>
    </tr>
}