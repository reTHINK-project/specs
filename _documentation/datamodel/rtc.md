---
layout: documentation
title: RT Communication Data Model 
category: datamodel
---

### RT Communication Data Model

<!--
@startuml "RTCommunication-Data-Object-Model.png"

package Stream <<Rect>> {

	interface MediaStreamTrack : EventTarget {
    readonly    attribute DOMString             kind;
    readonly    attribute DOMString             id;
    readonly    attribute DOMString             label;
                attribute boolean               enabled;
    readonly    attribute boolean               muted;
                attribute EventHandler          onmute;
                attribute EventHandler          onunmute;
    readonly    attribute boolean               _readonly;
    readonly    attribute boolean               remote;
    readonly    attribute MediaStreamTrackState readyState;
                attribute EventHandler          onended;
	};

dictionary MediaTrackSupportedConstraints {
    boolean width;
    boolean height;
    boolean aspectRatio;
    boolean frameRate;
    boolean facingMode;
    boolean volume;
    boolean sampleRate;
    boolean sampleSize;
    boolean echoCancellation;
    boolean deviceId;
    boolean groupId;
};

	dictionary MediaTrackCapabilities {
    (long or LongRange)     width;
    (long or LongRange)     height;
    (double or DoubleRange) aspectRatio;
    (double or DoubleRange) frameRate;
    DOMString               facingMode;
    (double or DoubleRange) volume;
    (long or LongRange)     sampleRate;
    (long or LongRange)     sampleSize;
    sequence<boolean>       echoCancellation;
    DOMString               deviceId;
    DOMString               groupId;
	};


enum MediaStreamTrackState {
    "live",
    "ended"
};

enum SourceTypeEnum {
    "camera",
    "microphone"
};
	dictionary MediaTrackSettings {
    long      width;
    long      height;
    double    aspectRatio;
    double    frameRate;
    DOMString facingMode;
    double    volume;
    long      sampleRate;
    long      sampleSize;
    boolean   echoCancellation;
    DOMString deviceId;
    DOMString groupId;
	}

enum MediaDeviceKind {
    "audioinput",
    "audiooutput",
    "videoinput"
};
}

package Connection <<Rect>> {

	class	Receiver {

	}

	class	Sender {

	}

}



@enduml
-->

![Communication Data Object Model](RTCommunication-Data-Object-Model.png)

Connection Receiver and Sender classes are compliant with ORTC spec.
Sender is an Observer Object (changes made remotely) while Receiver is a Reporter object (changes made locally).

**Open Issue:** does it work with current SDP based peerconnection API?
