import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "../../api/axios";


const User = () => {
    const RecommendUsers = '/recommendTopTenUsers';
    const [users, setUsers] = useState([]);


    useEffect(() => {
        try {
            const data = JSON.stringify({});
            axios.post(RecommendUsers, data, {
                headers: { 'Content-Type': 'application/json' },
                "Accept": 'application/json',
                withCredentials: true
            })
                .then((result) => {
                    console.log(result)
                    setUsers(result.data);
                })
        } catch (err) {
            console.log(err)
        };
    }, []);


    return (
        <div className='pl-44 bg-gray-50 dark:bg-gray-800'>

            <div class="2xl:h-[910px] h-screen sm:h-[889px] lg:h-[774px] overflow-y-scroll px-4 grid-cols-1 grid bg-slate-100">
                <div class="container mx-auto overflow-y-scroll px-4 sm:px-8">
                    <div class="py-8">
                        <div>
                            <h2 class="text-2xl text-black font-semibold leading-tight">Top 10 Users</h2>
                        </div>

                        <div class="-mx-4text-gray-500 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div class="inline-block min-w-full text-gray-500 shadow rounded-lg overflow-y-scroll">
                                <table class="min-w-full text-gray-500 bg-gray-800 leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                User
                                            </th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Role
                                            </th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Completed Jobs
                                            </th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Profile Visits
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr>
                                                <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                                    <Link to={`/profile/${user.id}`}>

                                                        <div class="flex items-center">
                                                            <div class="flex-shrink-0 w-10 h-10">
                                                                <img class="w-full h-full rounded-full"
                                                                    src={user.profileUrl ? user.profileUrl : 'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA='}
                                                                    alt={user.firstname} />
                                                            </div>
                                                            <div class="ml-3">
                                                                <p class="text-gray-200 whitespace-no-wrap">
                                                                    {user.firstname} {user.lastname}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                                    <Link to={`/profile/${user.id}`}>

                                                        <p class="text-gray-200 whitespace-no-wrap">{user.email}</p>
                                                    </Link>
                                                </td>
                                                <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                                    <Link to={`/profile/${user.id}`}>
                                                        <p class="text-gray-200 whitespace-no-wrap">
                                                            {user.userType}
                                                        </p>
                                                    </Link>
                                                </td>
                                                <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                                    <Link to={`/profile/${user.id}`}>
                                                        <p class="text-gray-200 whitespace-no-wrap">
                                                            {user.completed}
                                                        </p>
                                                    </Link>
                                                </td>
                                                <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                                    <Link to={`/profile/${user.id}`}>
                                                        <p class="text-gray-200 whitespace-no-wrap">
                                                            {user.profileVisits}
                                                        </p>
                                                    </Link>
                                                </td>

                                            </tr>
                                        ))}

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;


{/* <div class="-mx-4text-gray-500 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
<div class="inline-block min-w-full text-gray-500 shadow rounded-lg overflow-y-scroll">
    <table class="min-w-full text-gray-500 bg-gray-800 leading-normal">
        <thead>
            <tr>
                <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                </th>
                <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                </th>
                <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                </th>
                <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Completed Jobs
                </th>
                <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Profile Visits
                </th>

            </tr>
        </thead>
        <tbody>
            {searchResults.map((user) => (
                <tr>
                    <td class="px-5 py-5 border-b border-gray-200  text-sm">
                        <Link to={`/profile/${user.id}`}>

                            <div class="flex items-center">
                                <div class="flex-shrink-0 w-10 h-10">
                                    <img class="w-full h-full rounded-full"
                                        src={user.profileUrl ? user.profileUrl : 'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA='}
                                        alt={user.firstname} />
                                </div>
                                <div class="ml-3">
                                    <p class="text-gray-200 whitespace-no-wrap">
                                        {user.firstname} {user.lastname}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200  text-sm">
                        <Link to={`/profile/${user.id}`}>

                            <p class="text-gray-200 whitespace-no-wrap">{user.email}</p>
                        </Link>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200  text-sm">
                        <Link to={`/profile/${user.id}`}>
                            <p class="text-gray-200 whitespace-no-wrap">
                                {user.userType}
                            </p>
                        </Link>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200  text-sm">
                        <Link to={`/profile/${user.id}`}>
                            <p class="text-gray-200 whitespace-no-wrap">
                                {user.completed}
                            </p>
                        </Link>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200  text-sm">
                        <Link to={`/profile/${user.id}`}>
                            <p class="text-gray-200 whitespace-no-wrap">
                                {user.profileVisits}
                            </p>
                        </Link>
                    </td>

                </tr>
            ))}

        </tbody>
    </table>

</div>
</div> */}