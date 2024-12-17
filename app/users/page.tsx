import prisma from '../../lib/prisma'

const fetchUsers = async () => {
    const users = await prisma.user.findMany()
    return users
}

type User = {
    id: string
    name: string
    email: string
};

const UsersPage = async () => {
    const users: User[] = await fetchUsers()

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
            <a href={'/users/new'}>Create new user</a>
        </div>
    );
};

export default UsersPage
