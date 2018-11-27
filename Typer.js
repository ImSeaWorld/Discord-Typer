/* Discord Typer x.1 */
var tyLoop;
var tySleep = 10000;
var tyAttacking = "";
var tyRunning = false;
var tyAuth = "*ACCOUNT AUTH TOKEN HERE*";

var Typer = {
	// Base XMLHTTP function to send out the typing packet
	Packet: function() {
		if (tyAttacking.length < 1) {
			console.log("[TYPER] Stop. Get help. Maybe a job.");
			return false;
		}

		console.log("[TYPER] Attacking: " + tyAttacking);

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == XMLHttpRequest.DONE) {
				if (this.status == 204) {
					console.log("[TYPER] Packet sent!");
					return true;
				}
			} return false;
		};

		xhr.open('POST', 'https://discordapp.com/api/v6/channels/' + tyAttacking + '/typing', true);
		xhr.setRequestHeader('authorization', tyAuth);
		xhr.send();
		return true;
	},

	Start: function() {
		if (tyAttacking === null || tyAttacking === "") {
			if (tyRunning) {
				console.log("Already running.");
				return; // Maybe add a function to add another channel/guild possibly in x.2
			} tyAttacking = this.CurrentChannel();
		}

		tyLoop = setInterval(function() {
			if (!Typer.Packet()) {
				Typer.Stop();
			}
		}, tySleep);

		tyRunning = true;
	},

	Stop: function() {
		clearInterval(tyLoop);
		tyRunning = false;
	},
	// Change sleep timer between XMLHTTP requests
	SetSleep: function(TimeMS) {
		this.Stop();
		tySleep = TimeMS;
		this.Start();
	},
	// ChangeChannel
	ChangeChannel: function(ChannelID) {
		this.Stop();
		tyAttacking = ChannelID;
		this.Start();
	},
	// Returns current channel
	CurrentChannel: function() {
		return window.location.href.split("/")[window.location.href.split("/").length - 1];
	}
};