export interface Appointment {
    _id: string;
    doctor_id: string;
    patient_id: string;
    date: string;
    time: string;
    doctor: {
        name: string;
        specialty: string;
    };
    patient: {
        name: string;
    };
}

export interface Doctor {
    _id: string;
    name: string;
    specialty: string;
}

export interface Patient {
    _id: string;
    name: string;
}