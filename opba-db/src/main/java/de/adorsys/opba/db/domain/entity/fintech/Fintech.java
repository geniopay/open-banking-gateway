package de.adorsys.opba.db.domain.entity.fintech;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.SequenceGenerator;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Fintech {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "fintech_id_generator")
    @SequenceGenerator(name = "fintech_id_generator", sequenceName = "fintech_id_sequence")
    private Long id;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(nullable = false)
    private byte[] data;
}
