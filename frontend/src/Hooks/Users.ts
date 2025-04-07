import { useContext } from 'react'
import { User, ContactsContextType } from '../Types'
import { GET_USERS_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import { ContactsContext } from '../Context/User';
import { convertJSONToUser } from '../Util/convertJSON'

export function useGetAllContacts() {
    const { contacts, setContacts } = useContext(ContactsContext) as ContactsContextType

    const options = {
        method: 'GET'
    }

    const getContacts = async () => {
        try {
            // TODO: set loading status
            fetch(GET_USERS_URL, options).then(res => {
                if (res.status !== 200) {
                    console.error("error")
                }

                return res.json();
            }).then((usersRes) => {
                const users = new Array<User>;

                usersRes.forEach((eg: any) => {
                    users.push(convertJSONToUser(eg));
                    setContacts(users);
                })
            }).catch(err => {
                return err
            })
        } catch(err) {
            // TODO handle error
            console.error(err)
        }
        
    }

    return [contacts, getContacts] as const
}