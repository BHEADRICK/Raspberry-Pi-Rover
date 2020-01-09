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
### Clone this repository
go back to /home/pi and type:
`git clone https://github.com/BHEADRICK/Raspberry-Pi-Rover.git`

You may wish to edit the index.js inside

For the pins to connect your H bridge(s) to , I had to consult this page:
https://github.com/nebrius/raspi-io/wiki/Pin-Information
 On the Pi 3b, P1-33 is wPi pin 23, and P1-35 is wPi pin 24
 P1-32 is wPi pin 26, and P1-36 is wPi pin 27
 you can use the command ...
`		gpio readall	`
 ...to figure out the physical pin numbers from that
You can start it up by running
`sudo node index.js`
You don't usually have to run node as sudo, but since we have hardware access here, you need to run as sudo.

#### Make the node server run on startup
This part can be a bit tricky, but luckily, there are a couple packages out there that help with this. 
There's:
* Forever - https://github.com/foreverjs/forever
* PM2 - https://github.com/Unitech/pm2
 
 I like PM2 better because it will add itself to your startup with a simple command. 
 First, we have to install it:
 `sudo npm install -g pm2`
 You may see a warning about fsevent not being compatible - don't worry, we don't need it. 
 now, the simple command to start this up is:
 `pm2 start /home/pi/Raspberry-Pi-Rover/index.js`
 But, for me, at least, the command wasn't immediately available - there's a way to fix this, but since we only need to run it a couple times and it has to be run by sudo anyway, it's not worth the effort. 
 
 First, we need to locate pm2:
 `whereis pm2`
 Use that full path to run pm2 - for me, it's:
 `/opt/nodejs/bin/pm2`
 so, that means we need to first run this command:
 `sudo /opt/nodejs/bin/pm2 start /home/pi/Raspberry-Pi-Rover/index.js`
 And then:
 `sudo /opt/nodejs/bin/pm2 startup`
 Now, our node server will start on boot
 ### Video stream
 There are a few different options out there, but this seems to be the best balance of frame rate and lag:
 http://elinux.org/RPi-Cam-Web-Interface
 
 It's super easy to install and setup:
 `git clone https://github.com/silvanmelchior/RPi_Cam_Web_Interface.git
cd RPi_Cam_Web_Interface
chmod u+x *.sh
sudo ./install.sh`

You will be prompted for a few things along the way - for the most part, the choices don't matter. Nginx is generally more lightweight than Apache, but for something like this, the difference will be negligible. 

You'll also be prompted for the path to use. Choose the default option. This one matters, since it needs to be consistent with what's in the mobile app. 

It will automatically set itself up to run on startup, so we don't have to do anything for that. 
 
## Mobile app
Here's the repo for that:
https://github.com/BHEADRICK/Raspberrry-Pi-Rover-App

It's still a work in progress but it's already to the point of being able to control the rover. I just haven't added in the interface to help you connect to the hotspot on the pi...

## Hardware
What I'm working with is this: http://www.thingiverse.com/thing:1240754
It lists all the non-printable items to get it working other than the control board and motor drivers (more about that below)


If you don't have access to a 3d printer, or just dont want to wait for all of that printing, as it's pretty intricate, there are a few affordable options out there: 
https://hobbyking.com/en_us/dg012-tank-sv-standard-version-multi-chassis-kit-with-two-rubber-tracks.html
http://www.robotshop.com/en/mini-robotshop-rover-chassis-kit.html?gclid=CjwKEAiAtefDBRDTnbDnvM735xISJABlvGOvfZY6jPIlsZMAIqKYJJmUVULqziKxXB3V3B1RajcsLBoCIcrw_wcB

### Motor Driver
The pi doesn't output enough power to run a motor - that's wher the driver comes in, it takes the pwm and directional output from the pi and amplifies the power. The one below is good enough to handle 2 amps, wich is more than enough for any tiny motors you might use

Either way, you'll also need a directional H Bridge. One of these is all you need. 
https://www.amazon.com/gp/product/B014KMHSW6/ref=s9_simh_gw_g60_i1_r?ie=UTF8&fpl=fresh&pf_rd_m=ATVPDKIKX0DER&pf_rd_s=&pf_rd_r=8KB73H1J0DH6CSWBRJKD&pf_rd_t=36701&pf_rd_p=a6aaf593-1ba4-4f4e-bdcc-0febe090b8ed&pf_rd_i=desktop

### Power Supply
I originaly used a small power bank to power the Pi plus a few AA batteries to power the motors, but I discovered that this did not have enough power to move the rover with the treads on. (The wheels would spin, but when you set it down, it wouldn't go anywhere). I later discovered that the best option is to use the type of battery typically used by drones. I haven't really experimented to determine what AH rating is ideal, but this is what was recommended:
https://www.amazon.com/GOLDBAT-5000mAh-Hardcase-Battery-Airplane/dp/B07QSF3LSS/
Of course, there's some additional circuitry required to use this to power the PI as well as the motors. (The raspi doesn't have a voltage regulator if you power it through the pins.)
