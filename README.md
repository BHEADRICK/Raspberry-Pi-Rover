# Raspberry-Pi-Rover

The idea is to have a rover (potentially with an fpv camera) controlled by a mobile device. We will use Ionic framework for the app on the mobile device. The app will interface with the raspberry pi GPIO through the use of a node server running on the pi. We can stream the video from the fpv camera to the app as well. 

##There are 4 parts to this. 
*First is the connection to the rover - we will connect a mobile device to the rover by setting the pi up as a hotspot. 
*Second is the software on the pi to control the rover along with a REST API server to accept commands
*Third is a mobile app to interface with the REST API - we'll use Ionic Framework for this
*Fourth - The hardware

##Install software on the Pi:

You can follow the steps on this page, or follow along below: https://learn.adafruit.com/setting-up-a-raspberry-pi-as-a-wifi-access-point/install-software

You can skip the part about NAT, since we don't need to serve an internet connection. 

On the hostapd.conf file, you can go a few different ways, but my plan is to set the SSID and Passphrase to some random text, and then use a qrcode. We can use a qrcode reader in the app to translate the qrcode and hopefully connect to the wireless network automatically.

###Installing Node

The nodejs that gets installed through the standard apt repository at the present moment is a bit buggy, so we need to install amore current version. I've found This script to work flawlessly:

sudo apt-get install git -y && git clone https://github.com/BHEADRICK/NodeJs-Raspberry-Pi.git && cd NodeJs-Raspberry-Pi && chmod +x Install-Node.sh && sudo ./Install-Node.sh;

### Setup Node Server

You need to install one prerequisite first:
`sudo apt-get install wiringpi`
and a couple npm prerequisites:
`sudo npm install -g node-gyp node-pre-gyp raspi`


For the pins to connect your H bridge(s) to , I had to consult this page:
https://github.com/nebrius/raspi-io/wiki/Pin-Information
 On the Pi 3b, P1-33 is wPi pin 23, and P1-35 is wPi pin 24
 P1-32 is wPi pin 26, and P1-36 is wPi pin 27
 you can use the command ...
`		gpio readall	`
 ...to figure out the physical pin numbers from that
 
### Mobile app
Here's the repo for that:
https://github.com/BHEADRICK/Raspberrry-Pi-Rover-App

It's still a work in progress but it's already to the point of being able to control the rover. I just haven't added in the interface to help you connect to the hotspot on the pi or set up the video streaming yet...
