import { GET_GROUP_MEMBERS_URL } from '../config'
import { GroupMember } from '../Types'


export const addGroupMember = async (groupMember: GroupMember) => {
    const options = {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
        body: JSON.stringify(groupMember)
      }

    try{
        fetch(GET_GROUP_MEMBERS_URL, options).then(res => {
            console.log(res.status)
        })
    } catch(e) {
        console.error(e)
    }
}

export const deleteGroupMember = () => {
    console.log("deleting!")
}