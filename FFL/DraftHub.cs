using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace FFL
{
    [HubName("draftHub")]
    public class DraftHub : Hub
    {
        public void send(string message)
        {
            
            base.Clients.All.broadcastMessage(message);
        }

    }
}