# Raspberry-Pi-Rover

The idea is to have a rover (potentially with an fpv camera) controlled by a mobile device. We will use Ionic framework for the app on the mobile device. The app will interface with the raspberry pi GPIO through the use of a node server running on the pi. We can stream the video from the fpv camera to the app as well. 

##There are 3 parts to this. 
First is the connection to the rover - we will connect a mobile device to the rover by setting the pi up as a hotspot. 


##Install software on the Pi:

You can follow the steps on this page, or follow along below: https://learn.adafruit.com/setting-up-a-raspberry-pi-as-a-wifi-access-point/install-software

You can skip the part about NAT, since we don't need to serve an internet connection. 

On the hostapd.conf file, you can go a few different ways, but my plan is to set the SSID and Passphrase to some random text, and then use a qrcode. We can use a qrcode reader in the app to translate the qrcode and hopefully connect to the wireless network automatically.

##Install Node

The nodejs that gets installed through the standard apt repository at the present moment is a bit buggy, so we need to install amore current version. I've found This script to work flawlessly:

sudo apt-get install git && git clone https://github.com/audstanley/NodeJs-Raspberry-Pi-Arm7 && cd NodeJs-Raspberry-Pi-Arm7 && chmod +x Install-Node.sh && sudo ./Install-Node.sh;

## Setup Node Server

Clone this repository...

