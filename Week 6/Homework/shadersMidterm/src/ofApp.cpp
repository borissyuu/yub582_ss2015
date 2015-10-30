#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){

    ofEnableAlphaBlending();
    //ofSetLogLevel(OF_LOG_VERBOSE);
    //ofSetVerticalSync(false);
    
    width = 100;
    height = 100;
    res = 10;
    
    ofBackground(0);
    ofEnableDepthTest();
    mult = 0/001;
    z = 0.0;
    
    shader.load("pattern.vert", "pattern.frag");
    //shader.load("pattern2.vert", "pattern2.frag");
    
    panCam.setPosition(500, 0, 0);
}

//--------------------------------------------------------------
void ofApp::update(){

    z += 0.01;
    
    //pan cam
    ofVec3f center = ofVec3f(0, 0, 0);
    
//    panCam.setPosition(x, y, 200);
//    panCamlookAt(center, ofVec3f(0, 0, 0));
}

//--------------------------------------------------------------
void ofApp::draw(){
    
    easy.begin();
    
    shader.begin();
    shader.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight());
    shader.setUniform1f("u_time", ofGetElapsedTimef());
    
    ofSetColor(255);
    for (int y = -ofGetHeight()/2; y < (ofGetHeight()/2)-50; y+=20) { // changing values increases or decreases number of boxes and spacing between them
        for (int x = -ofGetWidth()/2; x < (ofGetWidth()/2)-50; x+=20) {
            
            float noise = ofNoise(x*mult, y*mult, z);
            ofRect(x, y, noise*25, noise*25);
        }
    }
    
    shader.end();
    easy.end();

}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
