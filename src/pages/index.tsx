import axios from 'axios'
import { FormEvent, useState } from 'react'

export default function Home() {
  const [inviteData, setInviteData] = useState({})
  const [showCard, setShowCard] = useState(false)
  const [inviteLink, setInviteLink] = useState('')

  function handleGetInviteData(event: FormEvent) {
    event.preventDefault()
    axios.get(`/api/${inviteLink}`).then((response) => {
      setInviteData(response.data)
      console.log(response.data)
    })
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <header className="w-full flex items-center justify-center bg-[#5865f2]">
        <h1 className="text-3xl font-bold py-3">Discord Invite LookUp</h1>
      </header>

      <form
        onSubmit={handleGetInviteData}
        className="mt-12 flex flex-col items-center gap-4 max-w-lg w-full"
        action=""
      >
        <div className="max-w-xl w-full">
          <label className="font-bold ml-1" htmlFor="invite-link">
            Invite link:
          </label>
          <input
            value={inviteLink}
            onChange={(event) => {
              setInviteLink(event.target.value)
            }}
            placeholder="https://discord.gg/Xe9UJtdP"
            id="invite-link"
            className="text-3xl bg-[#202225] rounded-md p-3 max-w-xl w-full border-none outline-none focus:outline-2 focus:outline-[#7984fa]"
            type="text"
          />
        </div>
        <button
          className="bg-[#5865f2] text-2xl font-bold px-4 py-2 rounded-md hover:bg-white hover:text-[#5865f2] transition-colors"
          type="submit"
        >
          Get Info
        </button>
      </form>
    </div>
  )
}
