import axios from 'axios'
import { FormEvent, useState } from 'react'

import { Hash, SpeakerHigh, FileArrowDown } from 'phosphor-react'

import { saveAs } from 'file-saver'
import { format } from 'date-fns'

export default function Home() {
  const [inviteData, setInviteData] = useState({})
  const [showCard, setShowCard] = useState(false)
  const [inviteLink, setInviteLink] = useState('')

  function handleDownloadServerIcon() {
    saveAs(
      `https://cdn.discordapp.com/icons/${inviteData.guild.id}/${inviteData.guild.icon}?size=512`,
    )
  }

  function handleGetInviteData(event: FormEvent) {
    event.preventDefault()
    axios.get(`/api/${inviteLink}`).then((response) => {
      const data = response.data.name
      if (response.data.successful === false) return alert(response.data.error)
      else {
        console.log(data)
        setInviteData(data)
        setShowCard(true)
      }
    })
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <header className="w-full flex items-center justify-center bg-[#5865f2]">
        <h1
          onClick={() => window.location.reload()}
          className="text-3xl font-bold py-3 cursor-pointer"
        >
          Discord Invite LookUp
        </h1>
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
            className="transition-all text-3xl bg-[#202225] rounded-md p-3 max-w-xl w-full border-none outline-none focus:outline-2 focus:outline-[#7984fa]"
            type="text"
            required
          />
        </div>
        <button
          className="bg-[#5865f2] text-2xl font-bold px-4 py-2 rounded-md hover:bg-white hover:text-[#5865f2] transition-colors"
          type="submit"
        >
          Get Info
        </button>
      </form>
      <div>
        {showCard ? (
          <div className="flex flex-col gap-8">
            <div className="bg-[#2b2d31] mt-16 flex gap-8 rounded-md p-6 relative">
              <div className="relative">
                <img
                  className="rounded-md"
                  width={200}
                  src={`https://cdn.discordapp.com/icons/${inviteData.guild.id}/${inviteData.guild.icon}?size=256`}
                  alt=""
                />
                <FileArrowDown
                  className="absolute z-10 bottom-[-10px] -right-4 opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
                  size={32}
                  color="#ffffff"
                  weight="fill"
                  onClick={handleDownloadServerIcon}
                />
              </div>
              <div className="flex flex-col items-center gap-4">
                <span className="font-bold text-2xl">
                  {inviteData.guild.name}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="font-bold">
                    Expira em:{' '}
                    <span className="font-normal italic">
                      {inviteData.expires_at == null
                        ? 'Nunca'
                        : format(
                            new Date(inviteData.expires_at),
                            "dd/MM/yyyy 'ás' HH:mm ",
                          )}
                    </span>
                  </span>
                  <span className="font-bold">
                    ID do servidor:{' '}
                    <span className="font-normal italic select-all">
                      {inviteData.guild.id}
                    </span>
                  </span>
                  <div className="flex items-center">
                    <span className="mr-2 font-bold">Canal do convite:</span>
                    <div className="flex items-center bg-[#404249] px-2 rounded-md">
                      {inviteData.channel.type === 0 ? (
                        <Hash
                          className="w-6"
                          color="#9c9fa8"
                          size={32}
                          width={'bold'}
                        />
                      ) : (
                        <SpeakerHigh
                          className="w-6 "
                          color="#9c9fa8"
                          size={32}
                          width={'bold'}
                        />
                      )}
                      <span className="ml-1">{inviteData.channel.name}</span>
                    </div>
                  </div>
                </div>
                {inviteData.inviter ? (
                  <div className="flex gap-3">
                    <img
                      width={50}
                      src={`https://cdn.discordapp.com/avatars/${inviteData.inviter.id}/${inviteData.inviter.avatar}`}
                      alt=""
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold">Luiiz</span>
                      <span className="italic">#7786</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
