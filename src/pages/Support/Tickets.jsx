// src/pages/Support/Tickets.jsx
"use client"

import { useState } from "react"
import { MdCheck, MdClose, MdReply, MdAdd } from "react-icons/md"

const Tickets = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      subject: 'Survey not loading',
      status: 'open',
      priority: 'high',
      createdAt: '2023-06-01',
      messages: [
        {
          id: 1,
          sender: 'Company User',
          message: 'The survey page shows a 404 error',
          sentAt: '2023-06-01 10:30'
        },
        {
          id: 2,
          sender: 'Support Team',
          message: 'We are looking into this issue',
          sentAt: '2023-06-01 11:15'
        }
      ]
    },
    {
      id: 2,
      subject: 'Export not working',
      status: 'resolved',
      priority: 'medium',
      createdAt: '2023-05-28',
      messages: [
        {
          id: 1,
          sender: 'Company User',
          message: 'Cannot export survey results',
          sentAt: '2023-05-28 14:20'
        },
        {
          id: 2,
          sender: 'Support Team',
          message: 'This has been fixed in the latest update',
          sentAt: '2023-05-29 09:45'
        }
      ]
    }
  ])
  const [newTicket, setNewTicket] = useState({
    subject: '',
    priority: 'medium',
    message: ''
  })
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [replyMessage, setReplyMessage] = useState('')

  const handleCreateTicket = (e) => {
    e.preventDefault()
    const ticket = {
      id: Date.now(),
      subject: newTicket.subject,
      status: 'open',
      priority: newTicket.priority,
      createdAt: new Date().toISOString().split('T')[0],
      messages: [{
        id: 1,
        sender: 'Company User',
        message: newTicket.message,
        sentAt: new Date().toISOString()
      }]
    }
    setTickets([...tickets, ticket])
    setNewTicket({ subject: '', priority: 'medium', message: '' })
  }

  const handleReply = (e) => {
    e.preventDefault()
    if (!replyMessage.trim()) return
    
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === selectedTicket.id) {
        return {
          ...ticket,
          messages: [
            ...ticket.messages,
            {
              id: ticket.messages.length + 1,
              sender: 'Support Team',
              message: replyMessage,
              sentAt: new Date().toISOString()
            }
          ]
        }
      }
      return ticket
    })
    
    setTickets(updatedTickets)
    setSelectedTicket(updatedTickets.find(t => t.id === selectedTicket.id))
    setReplyMessage('')
  }
 