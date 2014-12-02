TFSSlackRelay
=============

node.js server to take messages from TFS and send to Slack

Requires configuration of { slackHost }, { token }, { channel }, and { server } in relay.js.

For use with upstart, edit tfs-slack-relay.conf changing to your { user }, copy to /etc/init, then sudo start tfs-slack-relay (hat tip: http://technosophos.com/2013/03/06/how-use-ubuntus-upstart-control-nodejs-forever.html)

TODO

Switch to https

Move variables into config file
