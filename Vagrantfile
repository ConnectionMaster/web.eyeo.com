# -*- mode: ruby -*-
# vi: set ft=ruby fenc=utf-8:
# coding: utf-8
require "vagrant"

# https://www.vagrantup.com/docs/vagrantfile/version.html
VAGRANT_API_VERSION = "2"

# All Vagrant configuration is done here. The most common configuration
# options are documented and commented below. For a complete reference,
# please see the online documentation at: https://www.vagrantup.com/
Vagrant.configure(VAGRANT_API_VERSION) do |config|

  # https://www.vagrantup.com/docs/vagrantfile/machine_settings.html
  config.vm.host_name = "eyeo.com"

  # https://www.vagrantup.com/docs/boxes.html
  config.vm.box = "debian/contrib-jessie64"
  config.vm.box_url = "https://atlas.hashicorp.com/debian/boxes/contrib-jessie64"

  config.vm.network "private_network", ip: ENV.fetch("VAGRANT_IP", "10.8.0.108")

  # Docker installation (implicitly done by Vagrant's "docker" provisioner)
  # requires APT to recognize HTTPS, e.g. deb https://get.docker.com/ubuntu
  config.vm.provision "shell", inline: <<-end
    cat >/etc/apt/sources.list.d/backports.list <<"    END"
      deb http://ftp.de.debian.org/debian/ jessie-backports main
      deb-src http://ftp.de.debian.org/debian/ jessie-backports main
    END
    apt-get -y update
    apt-get -y install docker.io
  end

  config.vm.provision "docker" do |docker|
    docker.build_image "/vagrant", args: "-t 'uplink'"
    docker.run "uplink", args: "-p 80:80"
  end

  # https://github.com/mitchellh/vagrant/issues/1673
  config.ssh.shell = "sh -c 'BASH_ENV=/etc/profile exec bash'"

end
