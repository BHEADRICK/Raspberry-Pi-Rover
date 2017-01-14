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
 
## Mobile app
Here's the repo for that:
https://github.com/BHEADRICK/Raspberrry-Pi-Rover-App

It's still a work in progress but it's already to the point of being able to control the rover. I just haven't added in the interface to help you connect to the hotspot on the pi or set up the video streaming yet...

## Hardware
What I'm working with is this: http://www.thingiverse.com/thing:1240754
It lists all the non-printable items to get it working other than the control board and motor drivers (more about that below)


If you don't have access to a 3d printer, or just dont want to wait for all of that printing, as it's pretty intricate, there are a few affordable options out there: 
https://hobbyking.com/en_us/dg012-tank-sv-standard-version-multi-chassis-kit-with-two-rubber-tracks.html
http://www.robotshop.com/en/mini-robotshop-rover-chassis-kit.html?gclid=CjwKEAiAtefDBRDTnbDnvM735xISJABlvGOvfZY6jPIlsZMAIqKYJJmUVULqziKxXB3V3B1RajcsLBoCIcrw_wcB

Either way, you'll also need a directional H Bridge. One of these is all you need. 
https://www.amazon.com/gp/product/B014KMHSW6/ref=s9_simh_gw_g60_i1_r?ie=UTF8&fpl=fresh&pf_rd_m=ATVPDKIKX0DER&pf_rd_s=&pf_rd_r=8KB73H1J0DH6CSWBRJKD&pf_rd_t=36701&pf_rd_p=a6aaf593-1ba4-4f4e-bdcc-0febe090b8ed&pf_rd_i=desktop

